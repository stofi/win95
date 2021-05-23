<template>
  <!-- shadow-px -->
  <button
    class="
      border-px border-gray-900 border-t-gray-200 border-l-gray-200
      text-gray-900
      font-bold
      bg-gray-400
      group
      focus:outline-none
      relative
      focus:border-t-gray-900 focus:border-l-gray-900
    "
  >
    <div
      class="z-0 group-focus:outline-px absolute group-active:outline-none m-px"
      :class="focusInset"
    ></div>
    <div
      class="
        leading-none
        px-px
        h-full
        w-full
        border-px border-gray-400 border-b-gray-500 border-r-gray-500
        group-focus:border-t-gray-200
        group-focus:border-l-gray-200
        group-active:border-t-gray-500
        group-active:border-l-gray-500
      "
    >
      <div
        class="
          h-full
          w-full
          flex
          justify-center
          items-center
          transform
          group-active:translate-x-px group-active:translate-y-px
        "
      >
        <slot />
      </div>
    </div>
  </button>
</template>
<script setup lang="ts">
import WBox from './WBox.vue'
import { defineProps } from 'vue'

defineProps({
  focusInset: {
    type: String,
    default: 'inset-px',
  },
})
</script>
