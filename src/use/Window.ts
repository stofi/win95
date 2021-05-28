import {
  ref,
  reactive,
  computed,
  defineProps,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  defineEmit,
  useContext,
  Ref,
} from 'vue'

import useDraggable from './Draggable'
import useStack from './Stack'
import useActive from './Active'
import useResizable from './Resizable'

import { ComponentOrElementOrNull, WindowOptions } from '../types'

export default function (
  windowElement: Ref<ComponentOrElementOrNull>,
  dragHandle: Ref<ComponentOrElementOrNull>,
  resizeHandle: Ref<ComponentOrElementOrNull>,
  options: WindowOptions = {}
) {
  const { style: wmStyle, front } = useStack()
  const { activate, isActive } = useActive({
    onActivated: options.onActivated
  })

  const resizeEnabled = computed(() => options.resizable || false)

  const {
    style: resizeStyle,
    resizing,
    fullscreen,
    toggleFullscreen,
    activateFullscreen,
    deactivateFullscreen,
  } = useResizable(windowElement, resizeHandle, {
    height: options.height || 100,
    width: options.width || 200,
    enabled: resizeEnabled,
    onMaximized: options.onMaximized,
    onResizeEnd: options.onResizeEnd,
    onResizeStart: options.onResizeStart,
  })

  const dragEnabled = computed(() =>
    fullscreen.value ? false : options.draggable || false
  )

  const {
    style: draggableStyle,
    dragging,
    move,
  } = useDraggable(windowElement, dragHandle, {
    enabled: dragEnabled,
    onDragEnd: options.onDragEnd,
    onDragStart: options.onDragStart
  })
  onMounted(() => {
    move({
      x: options.x || 0,
      y: options.y || 0,
    })
  })

  function activateWindow() {
    front()
    activate()
  }
  const computedStyle = computed(() => {
    const isFullscreen = fullscreen.value
    const position = isFullscreen
      ? { top: '0', left: '0' }
      : draggableStyle.value
    return {
      ...resizeStyle.value,
      ...wmStyle.value,
      ...position,
    }
  })

  return {
    activateWindow,
    fullscreen,
    computedStyle,
    isActive,
    toggleFullscreen,
  }
}
