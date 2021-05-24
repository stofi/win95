import { ComponentOrElementOrNull } from '../types'
import { ComponentPublicInstance } from 'vue'

export function getElement(instance: ComponentOrElementOrNull) {
  if (!instance)  return
  if ((instance as ComponentPublicInstance).$el) {
    return (instance as ComponentPublicInstance).$el
  }
  return instance
}
