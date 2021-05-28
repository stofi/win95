import {
  ref,
  reactive,
  computed,
  defineProps,
  onBeforeMount,
  onBeforeUnmount,
  watch,
  nextTick,
  defineEmit,
  useContext,
  Ref,
} from 'vue'
import { v4 as uuid } from 'uuid'

import {
  AcitiveOptions
} from '../types'

const active = ref<string | null>(null)
const blocked = ref<string | null>(null)

export default function (options: AcitiveOptions) {
  const id = uuid()
  const isActive = computed(() => active.value === id)
  function activate() {
    if (isActive.value) return
    if (blocked.value !== null && blocked.value !== id) return
    active.value = id
    options.onActivated && options.onActivated()
  }
  function block() {
    if (blocked.value !== null) return
    blocked.value = id
  }
  function unblock() {
    if (blocked.value !== id) return
    blocked.value = null
  }

  return {
    block,
    unblock,
    activate,
    isActive,
  }
}
