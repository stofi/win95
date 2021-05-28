<template>
  <WBox
    @mousedown="activateWindow"
    @touchstart="activateWindow"
    ref="windowElement"
    :tabindex="isActive ? -1 : 1000"
    :fullscreen="fullscreen"
    class="absolute flex flex-col select-none focus:outline-none"
    :style="{ ...computedStyle }"
  >
    <WTitle ref="dragHandle" :active="isActive" :fullscreen="fullscreen">
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
      v-if="!fullscreen && resizable"
      ref="resizeHandle"
      :width="8"
      :height="8"
      class="text-gray-500 absolute bottom-0 right-0"
    />
  </WBox>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'

import useWindow from '../use/Window'

import WBox from './WBox.vue'
import WBody from './WBody.vue'
import WTitle from './WTitle.vue'
import IconStripes from './Icon/Stripes.vue'
import ButtonGroupWindow from './ButtonGroup/Window.vue'

const props = defineProps({
  width: { type: Number, default: 200 },
  height: { type: Number, default: 100 },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  draggable: { type: Boolean, default: true },
  resizable: { type: Boolean, default: true },
})

const windowElement = ref(null)
const dragHandle = ref(null)
const resizeHandle = ref(null)

const {
  activateWindow,
  fullscreen,
  computedStyle,
  isActive,
  toggleFullscreen,
} = useWindow(windowElement, dragHandle, resizeHandle, {
  width: props.width,
  height: props.height,
  draggable: props.draggable,
  resizable: props.resizable,
  x: props.x,
  y: props.y,
  onDragStart() {
    console.log('onDragStart')
  },
  onDragEnd() {
    console.log('onDragEnd')
  },
  onResizeStart() {
    console.log('onResizeStart')
  },
  onResizeEnd() {
    console.log('onResizeEnd')
  },
  onMaximized() {
    console.log('onMaximized')
  },
  onActivated() {
    console.log('onActivated')
  },
})
</script>
