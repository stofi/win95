<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Tailwind + Vue-Router" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import useDarkmode from './use/Darkmode'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    useDarkmode()
  },
})
</script>
