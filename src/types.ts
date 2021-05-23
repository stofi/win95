import { Ref } from 'vue'

export interface Coordinates {
  x: number
  y: number
}

export interface ResizableOptions {
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  enabled?: any
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
  enabled?: any
}

export type ElementOrNull = HTMLElement | null
