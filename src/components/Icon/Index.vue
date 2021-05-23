<template>
  <svg
    :class="class"
    :viewBox="viewBox"
    :width="width"
    :height="height"
    preserveAspectRatio="xMidYMid mee`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  class: {
    type: String,
    default: 'w-2 h-2',
  },
  viewBox: {
    type: String,
    default: '0 0 32 32',
  },
  width: {
    type: Number,
    default: 32,
  },
  height: {
    type: Number,
    default: 32,
  },
})
</script>
