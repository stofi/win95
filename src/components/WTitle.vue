<template>
  <div
    class="w-full"
    :class="[
      active ? 'bg-blue-900' : 'bg-gray-500',
      fullscreen ? '' : 'border-px border-gray-400 ',
    ]"
  >
    <div
      class="
        flex
        justify-between
        items-center
        font-bold
        leading-3
        px-1
        py-1
        mt-px
        text-xs
      "
      :class="active ? 'text-gray-200' : 'text-gray-400'"
    >
      <div class="flex-2 tracking-wide">
        <slot />
      </div>
      <div class="flex-1"></div>
      <div class="flex-1">
        <slot name="ui" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
