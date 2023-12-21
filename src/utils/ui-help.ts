export function smoothScrollTo(
  element: HTMLElement,
  to: number,
  duration: number
) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    smoothScrollTo(element, to, duration - 10)
  }, 10)
}
