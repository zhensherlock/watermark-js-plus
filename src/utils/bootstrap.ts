export default () => {
  if (typeof window !== 'undefined') {
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
