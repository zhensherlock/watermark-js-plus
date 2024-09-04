export default (need: boolean) => {
  if (typeof window === 'undefined') {
    return
  }
  if (need) {
    Object.defineProperty(window, 'MutationObserver', {
      writable: false,
      configurable: false
    })
    Object.defineProperty(window, 'requestAnimationFrame', {
      writable: false,
      configurable: false
    })
  }
}
