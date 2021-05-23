<template>
  <WBox
    @mousedown="activateWindow"
    ref="windowElement"
    :fullscreen="fullscreen"
    class="absolute flex flex-col select-none"
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
      v-if="!fullscreen"
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
})
</script>
