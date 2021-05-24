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

import { Coordinates, ElementOrNull, DraggableOptions } from '../types'

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
  options: DraggableOptions = { enabled: true }
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

  function getRect() {
    if (!$element.value) return { width: 0, height: 0 }
    // @ts-ignore
    const element = $element.value.$el
      ? // @ts-ignore
        $element.value.$el
      : $element.value
    return {
      width: element.clientWidth,
      height: element.clientHeight,
    }
  }

  onBeforeMount(() => {
    document.addEventListener('mousedown', mouseDownHandler)
    document.addEventListener('mouseup', mouseUpHandler)
    document.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('resize', resizeHandler)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', mouseDownHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('resize', resizeHandler)
  })
  function mouseDownHandler(event: MouseEvent) {
    if (!$element.value) return
    // @ts-ignore
    const element: HTMLElement = $element.value.$el
      ? // @ts-ignore
        $element.value.$el
      : $element.value

    const handle = $handle.value
      ? // @ts-ignore
        $handle.value.$el
        ? // @ts-ignore
          $handle.value.$el
        : $handle.value
      : element

    const target: any = event.target
    const isParent = handle.contains(target)

    if (!isParent) return
    const { top, left } = element.getBoundingClientRect()

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
  function drag({x,y}: Coordinates) {
    if (!options.enabled.value) return
    move({
      x: x - offset.x,
      y: y - offset.y,
    })
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
