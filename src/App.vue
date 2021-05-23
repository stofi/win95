<template>
  <router-view />
</template>

<script lang="ts" setup>
import useDarkmode from './use/Darkmode'

useDarkmode()
</script>

<style lang="postcss">
#app{
  @apply bg-green-800;
}
</style>
