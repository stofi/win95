<template>
  <WWindow :width="480" :height="320">
    <template #title>Big Window</template>
    <template #default>
      <div>content</div>
    </template>
  </WWindow>
  <WWindow :width="240" :height="120">
    <template #title>Little Window</template>
    <template #default>
      <div class="flex flex-col h-full">
        <div>content</div>
        <div class="mt-auto flex justify-end space-x-2">
          <ButtonDialog>OK</ButtonDialog>
          <ButtonDialog>Cancel</ButtonDialog>
          <ButtonDialog><span class="underline">B</span>rowse</ButtonDialog>
        </div>
      </div>
    </template>
  </WWindow>
</template>
<script setup lang="ts">
import WWindow from '../components/WWindow.vue'
import ButtonDialog from '../components/Button/Dialog.vue'
</script>

<style></style>
