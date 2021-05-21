<template>
  {{ msg }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    msg: {
      type: String,
      default: 'Hello World',
    },
  },
})
</script>
