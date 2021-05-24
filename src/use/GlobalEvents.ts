import { onBeforeMount, onBeforeUnmount } from 'vue'

type Handler = {
  (event: any): void
}

interface EventToRegister {
  event: keyof DocumentEventMap
  handler: Handler
  window?: boolean
}

export default function (events: EventToRegister[]) {
  onBeforeMount(() => {
    events.forEach(({ event, handler, window: windowEvent }) => {
      let target: Document | Window = document
      if (windowEvent) {
        target = window
      }
      target.addEventListener(event, handler)
    })
  })
  onBeforeUnmount(() => {
    events.forEach(({ event, handler, window: windowEvent }) => {
      let target: Document | Window = document
      if (windowEvent) {
        target = window
      }
      target.removeEventListener(event, handler)
    })
  })
}
