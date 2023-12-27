import { getStyle } from '@/utils/handle-style'

const isClient =
  typeof window !== 'undefined' && typeof document !== 'undefined'

export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
  if (!isClient) return false

  const key = (
    {
      undefined: 'overflow',
      true: 'overflowY',
      false: 'overflowX'
    } as any
  )[String(isVertical)]!
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): Window | HTMLElement | undefined => {
  let parent: HTMLElement = el
  while (parent) {
    const windowList = [
      window,
      document,
      document.documentElement,
      document.body
    ]
    if (windowList.includes(parent)) return window
    if (isScroll(parent, isVertical)) return parent

    parent = parent.parentNode as HTMLElement
  }
  return parent
}
