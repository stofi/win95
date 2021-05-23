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

import { Coordinates, ResizableOptions, ElementOrNull } from '../types'

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

export default function (
  $element: Ref<ElementOrNull>,
  $handle: Ref<ElementOrNull>,
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

  const cursor = computed(() => (resizing.value ? 'nw-resize' : 'auto'))

  onBeforeMount(() => {
    document.addEventListener('mousedown', mouseDownHandler)
    document.addEventListener('mouseup', mouseUpHandler)
    document.addEventListener('mousemove', mouseMoveHandler)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', mouseDownHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
  })
  function mouseDownHandler(event: MouseEvent) {
    if (!$element.value || !$handle.value) return
    // @ts-ignore
    const element: HTMLElement = $element.value.$el
      ? // @ts-ignore
        $element.value.$el
      : $element.value
    // @ts-ignore
    const handle: HTMLElement = $handle.value.$el
      ? // @ts-ignore
        $handle.value.$el
      : $handle.value

    const target: any = event.target
    const isParent = handle.contains(target)

    if (!isParent) return

    const { bottom, right } = element.getBoundingClientRect()
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
    if (!options.enabled.value) return
    _resize(coors)
  }

  function _resize({ x, y }: Coordinates) {
    const minHeight = options.minHeight || 100
    const minWidth = options.minWidth || 200

    if (!$element.value || !$handle.value) return
    // @ts-ignore
    const element: HTMLElement = $element.value.$el
      ? // @ts-ignore
        $element.value.$el
      : $element.value

    const { left, top } = element.getBoundingClientRect()
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
