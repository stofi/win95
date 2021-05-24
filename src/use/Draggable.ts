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
  ComponentOrElementOrNull,
  DraggableOptions,
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

const defaultOptions: DraggableOptions = {
  enabled: true,
}

export default function (
  elementRef: Ref<ComponentOrElementOrNull>,
  handleRef: Ref<ComponentOrElementOrNull>,
  options: DraggableOptions
) {
  const dragging = ref(false)
  const offset = reactive<Coordinates>({
    x: 0,
    y: 0,
  })
  const position = reactive<Coordinates>({
    x: 0,
    y: 0,
  })
  const cursor = computed(() => (dragging.value ? 'move' : 'auto'))

  const $element = computed(() => {
    return getElement(elementRef.value)
  })
  const $handle = computed(() => {
    if (!handleRef.value) return $element.value
    return getElement(handleRef.value)
  })

  function getRect() {
    if (!$element.value) return { width: 0, height: 0 }
    return {
      width: $element.value.clientWidth,
      height: $element.value.clientHeight,
    }
  }

  useDocumentEvents([
    { event: 'mousedown', handler: dragStart },
    { event: 'mouseup', handler: dragEnd },
    { event: 'mousemove', handler: dragMove },
    { event: 'touchstart', handler: dragStart },
    { event: 'touchend', handler: dragEnd },
    { event: 'touchcancel', handler: dragEnd },
    { event: 'touchmove', handler: dragMove },
    { event: 'resize', handler: resizeHandler, window:true },
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
    if (!$handle || !$handle.value) return
    const target: EventTarget | null = event.target
    if (!target) return
    const isParent = $handle.value.contains(target)
    if (!isParent) return
    const { top, left } = $element.value.getBoundingClientRect()

    offset.x = event.pageX - left
    offset.y = event.pageY - top
    dragging.value = true
  }
  function mouseUpHandler(event: MouseEvent) {
    dragging.value = false
  }
  function mouseMoveHandler(event: MouseEvent) {
    if (!dragging.value) return
    const coors: Coordinates = { x: event.pageX, y: event.pageY }
    drag(coors)
  }
  function resizeHandler() {
    move(position)
  }
  function drag({ x, y }: Coordinates) {
    const coors = {
      x: x - offset.x,
      y: y - offset.y,
    }

    if (typeof options.enabled === 'boolean') {
      if (options.enabled) {
        move(coors)
      }
    } else if (options.enabled && options.enabled.value) {
      move(coors)
    } else if (defaultOptions.enabled!) {
      move(coors)
    }
  }

  function move({ x, y }: Coordinates) {
    const { viewWidth, viewHeight } = getViewport()
    const rect = getRect()
    if (x + rect.width > viewWidth) {
      x = viewWidth - rect.width
    }
    if (y + rect.height > viewHeight) {
      y = viewHeight - rect.height
    }
    if (x < 0) {
      x = 0
    }
    if (y < 0) {
      y = 0
    }
    position.x = x
    position.y = y
  }

  const style = computed(() => ({
    top: `${position.y}px`,
    left: `${position.x}px`,
    cursor: cursor.value,
  }))
  return {
    dragging,
    move,
    style,
  }
}
