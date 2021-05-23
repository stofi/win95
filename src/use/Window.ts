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

import useDraggable from './Draggable'
import useStack from './Stack'
import useActive from './Active'
import useResizable from './Resizable'

import { ElementOrNull, WindowOptions } from '../types'

export default function (
  windowElement: Ref<ElementOrNull>,
  dragHandle: Ref<ElementOrNull>,
  resizeHandle: Ref<ElementOrNull>,
  options: WindowOptions = {}
) {

  const { style: draggableStyle, dragging } = useDraggable(
    windowElement,
    dragHandle
  )

  const { style: wmStyle, front } = useStack()
  const { activate, isActive } = useActive()
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
