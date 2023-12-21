import { useEffect, useRef } from 'react'

export function useClickOtherClose(fn: () => void) {
  const areaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickEl = event.target as HTMLElement
      if (areaRef.current && !areaRef.current.contains(clickEl)) {
        fn()
      }
    }

    // 在组件挂载后添加事件监听器
    document.addEventListener('mousedown', handleClickOutside)

    // 在组件卸载前移除事件监听器
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return areaRef // 返回 ref，以便在需要的元素上使用
}
