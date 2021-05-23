<template>
  <WBox
    @mousedown="activateWindow"
    ref="windowElement"
    :fullscreen="fullscreen"
    class="absolute flex flex-col select-none"
    :style="{ ...computedStyle }"
  >
    <WTitle ref="windowHandle" :active="isActive" :fullscreen="fullscreen">
      <template #default>
        <slot name="title" />
      </template>
      <template #ui>
        <ButtonGroupWindow @maximize="toggleFullscreen" />
      </template>
    </WTitle>
    <WBody>
      <slot name="default" />
    </WBody>
    <IconStripes
      v-if="!fullscreen"
      ref="resizeHandle"
      :width="8"
      :height="8"
      class="text-gray-500 absolute bottom-0 right-0"
    />
  </WBox>
</template>
<script setup lang="ts">
import { ref, computed, defineProps, useContext, watch } from 'vue'
import useDraggable from '../use/Draggable'
import useStack from '../use/Stack'
import useActive from '../use/Active'
import useResizable from '../use/Resizable'

import WBox from './WBox.vue'
import WBody from './WBody.vue'
import WTitle from './WTitle.vue'
import IconStripes from './Icon/Stripes.vue'
import ButtonGroupWindow from './ButtonGroup/Window.vue'

const element = ref<null | Element>(null)
const parent = computed(() =>
  element.value ? element.value.parentElement : null
)

const props = defineProps({
  width: { type: Number, default: 200 },
  height: { type: Number, default: 100 },
})

const context = useContext()
const windowElement = ref<null | HTMLElement>(null)
const resizeHandle = ref<null | HTMLElement>(null)
const windowHandle = ref<null | HTMLElement>(null)

const { style: draggableStyle, dragging } = useDraggable(
  windowElement,
  windowHandle
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
  height: props.height,
  width: props.width,
})

function activateWindow() {
  front()
  activate()
}
const computedStyle = computed(() => {
  const isFullscreen = fullscreen.value
  const position = isFullscreen ? { top: '0', left: '0' } : draggableStyle.value
  return {
    ...resizeStyle.value,
    ...wmStyle.value,
    ...position,
  }
})
</script>
