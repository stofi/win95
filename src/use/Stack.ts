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

const stack = ref<string[]>([])
// @ts-ignore
window.stack = stack

export default function () {
  const style = computed(() => ({
    zIndex: index.value,
  }))
  const id = uuid()
  const index = computed(() => stack.value.indexOf(id))
  const length = computed(() => stack.value.length)

  onBeforeMount(()=>{
    stack.value.push(id)
  })
  onBeforeUnmount(()=>{
    stack.value.splice(index.value, 1)
  })

  function forward() {
    if (index.value == length.value - 1) return
    ;[stack.value[index.value], stack.value[index.value + 1]] = [
      stack.value[index.value + 1],
      stack.value[index.value],
    ]
  }
  function backward() {
    if (index.value == 0) return
    ;[stack.value[index.value], stack.value[index.value - 1]] = [
      stack.value[index.value - 1],
      stack.value[index.value],
    ]
  }
  function front() {
    const position = stack.value.splice(index.value, 1)[0]
    stack.value.push(position)
  }
  function back() {
    const position = stack.value.splice(index.value, 1)[0]
    stack.value.unshift(position)
  }
  return {
    style,
    forward,
    backward,
    front,
    back,
  }
}
