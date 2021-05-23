<template>
  <div
    :class="
      fullscreen
        ? ''
        : 'border-px border-gray-500 border-t-gray-200 border-l-gray-200 shadow-px'
    "
  >
    <slot />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      fullscreen: {
    type: Boolean,
    default: false,
  },
    }
  })
</script>
