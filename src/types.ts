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
}

export interface WindowOptions {
  minWidth?: number
  minHeight?: number
  width?: number
  height?: number
  resizable?: false
  draggable?: false
}

export type ElementOrNull = HTMLElement | null
