import { useRef, MutableRefObject } from 'react'
import { getScrollContainer } from '@/utils/handle-scroll'

export function useScrollToRef(
  offset = 0,
  behavior: ScrollBehavior = 'auto'
): [MutableRefObject<HTMLDivElement | null>, () => void] {
  const elRef = useRef<HTMLDivElement | null>(null)
  function scrollToRef() {
    if (elRef.current) {
      const scrollEL = getScrollContainer(elRef.current)
      const y =
        elRef.current.getBoundingClientRect().top + window.scrollY - offset
      if (scrollEL) scrollEL.scrollTo({ top: y, behavior })
    }
  }

  return [elRef, scrollToRef]
}
