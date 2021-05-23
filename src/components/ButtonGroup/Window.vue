<template>
  <div class="flex justify-end items-center -mt-px space-x-1">
    <ButtonMinimize  @click="$emit('minimize')"/>
    <ButtonMaximize  @click="$emit('maximize')"/>
    <ButtonClose  @click="$emit('close')"/>
  </div>
</template>
<script setup lang="ts">
import { defineEmit } from 'vue'

import ButtonClose from '../Button/Close.vue'
import ButtonMinimize from '../Button/Minimize.vue'
import ButtonMaximize from '../Button/Maximize.vue'

const emit = defineEmit(['close', 'minimize', 'maximize'])
</script>
