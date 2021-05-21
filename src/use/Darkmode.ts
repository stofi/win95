import { onBeforeMount, ref } from 'vue'

export default function () {
  const darkModeEnabled = ref(false)

  onBeforeMount(
    () =>
      (darkModeEnabled.value = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches)
  )
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
    document.body.classList.add('dark')

  function toggle() {
    darkModeEnabled.value = !darkModeEnabled.value
    if (darkModeEnabled.value) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
  function setDarkmode(state: boolean) {
    darkModeEnabled.value = state
    if (darkModeEnabled.value) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
  return { darkModeEnabled, toggle, setDarkmode }
}
