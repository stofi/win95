import {
  ref,
  reactive,
  computed,
  defineProps,
  onBeforeMount,
  onBeforeUnmount,
  watch,
  nextTick,
  defineEmit,
  useContext,
  Ref,
} from 'vue'

import useDocumentEvents from './GlobalEvents'

import {
  Coordinates,
  ResizableOptions,
  ComponentOrElementOrNull,
} from '../types'
import { getElement } from '../utils'

const getViewport = () => ({
  viewHeight: Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ),
  viewWidth: Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  ),
})

const defaultOptions: ResizableOptions = {
  enabled: true,
}

export default function (
  elementRef: Ref<ComponentOrElementOrNull>,
  handleRef: Ref<ComponentOrElementOrNull>,
  options: ResizableOptions = { enabled: true }
) {
  const resizing = ref(false)
  const fullscreen = ref(false)
  const offset = reactive<Coordinates>({
    x: 0,
    y: 0,
  })
  const size = reactive<Coordinates>({
    x: options.width || 200,
    y: options.height || 100,
  })
  const $element = computed(() => {
    return getElement(elementRef.value)
  })
  const $handle = computed(() => {
    return getElement(handleRef.value)
  })

  const cursor = computed(() => (resizing.value ? 'nw-resize' : 'auto'))

  useDocumentEvents([
    { event: 'mousedown', handler: dragStart },
    { event: 'mouseup', handler: dragEnd },
    { event: 'mousemove', handler: dragMove },
    { event: 'touchstart', handler: dragStart },
    { event: 'touchend', handler: dragEnd },
    { event: 'touchcancel', handler: dragEnd },
    { event: 'touchmove', handler: dragMove },
  ])

  function dragStart(event: MouseEvent | TouchEvent) {
    mouseDownHandler(event as MouseEvent)
  }
  function dragEnd(event: MouseEvent | TouchEvent) {
    mouseUpHandler(event as MouseEvent)
  }
  function dragMove(event: MouseEvent | TouchEvent) {
    mouseMoveHandler(event as MouseEvent)
  }

  function mouseDownHandler(event: MouseEvent) {
    if (!$element.value || !$handle.value) return
    const target: EventTarget | null = event.target
    if (!target) return
    const isParent = $handle.value.contains(target)
    if (!isParent) return

    const { bottom, right } = $element.value.getBoundingClientRect()
    offset.x = event.pageX - right
    offset.y = event.pageY - bottom
    resizing.value = true
  }
  function mouseUpHandler(event: MouseEvent) {
    resizing.value = false
  }
  function mouseMoveHandler(event: MouseEvent) {
    if (!resizing.value) return
    const coors: Coordinates = { x: event.pageX, y: event.pageY }
    resize(coors)
  }
  function toggleFullscreen() {
    fullscreen.value = !fullscreen.value
  }
  function activateFullscreen() {
    fullscreen.value = true
  }
  function deactivateFullscreen() {
    fullscreen.value = false
  }

  function resize(coors: Coordinates) {
    if (typeof options.enabled === 'boolean') {
      if (options.enabled) {
        _resize(coors)
      }
    } else if (options.enabled && options.enabled.value) {
      _resize(coors)
    } else if (defaultOptions.enabled!) {
      _resize(coors)
    }
  }

  function _resize({ x, y }: Coordinates) {
    if (!$element.value) return
    const minHeight = options.minHeight || 100
    const minWidth = options.minWidth || 200

    const { left, top } = $element.value.getBoundingClientRect()
    const { viewWidth, viewHeight } = getViewport()

    let width = x - offset.x - left
    let height = y - offset.y - top

    if (width < minWidth) {
      width = minWidth
    }
    if (height < minHeight) {
      height = minHeight
    }
    if (height >= viewHeight) {
      height = viewHeight
    }
    if (width >= viewWidth) {
      width = viewWidth
    }

    size.x = width
    size.y = height
  }

  const style = computed(() =>
    fullscreen.value
      ? {
          height: `${getViewport().viewHeight}px`,
          width: `${getViewport().viewWidth}px`,
        }
      : {
          height: `${size.y}px`,
          width: `${size.x}px`,
          cursor: cursor.value,
        }
  )
  return {
    resizing,
    style,
    toggleFullscreen,
    activateFullscreen,
    deactivateFullscreen,
    fullscreen,
  }
}
