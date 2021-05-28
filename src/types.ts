import { Ref, ComputedRef, ComponentPublicInstance } from 'vue'

export interface Coordinates {
  x: number
  y: number
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
  onDragStart?: Function
  onDragEnd?: Function
  onResizeStart?: Function
  onResizeEnd?: Function
  onMaximized?: Function
  onActivated?: Function
}

export interface DraggableOptions {
  enabled?: boolean | Ref<boolean> | ComputedRef<boolean>
  onDragStart?: Function
  onDragEnd?: Function
}

export interface ResizableOptions {
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  enabled?: boolean | Ref<boolean> | ComputedRef<boolean>
  onResizeStart?: Function
  onResizeEnd?: Function
  onMaximized?: Function
}

export interface AcitiveOptions {
  onActivated?: Function
}

export type ComponentOrElementOrNull =
  | HTMLElement
  | null
  | ComponentPublicInstance
