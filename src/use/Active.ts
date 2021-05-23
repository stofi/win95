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

const active = ref<string | null>(null)
const blocked = ref<string | null>(null)

export default function () {
  const id = uuid()
  const isActive = computed(() => active.value === id)
  function activate() {
    if (blocked.value !== null && blocked.value !== id) return
    active.value = id
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
