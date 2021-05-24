import { Ref, ComponentPublicInstance } from 'vue'

export interface Coordinates {
  x: number
  y: number
}

export interface ResizableOptions {
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  enabled?: boolean | Ref<boolean>
}

export interface WindowOptions {
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  resizable?: boolean
  draggable?: boolean
  x?: number
  y?: number
}
export interface DraggableOptions {
  enabled?: boolean | Ref<boolean>
}

export type ComponentOrElementOrNull = HTMLElement | null | ComponentPublicInstance
