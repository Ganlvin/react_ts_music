import type { RouteObject } from 'react-router-dom'
export function mapModuleToRoutes() {
  // 1.先加载默认所有的routes
  const allRoutes: RouteObject[] = []
  // 导入module 文件下面 所有 ts 文件
  const routeFiles: Record<string, any> = import.meta.glob(
    '../module/**/*.tsx',
    { eager: true }
  )
  //将里面导出的路由 添加到数组
  Object.values(routeFiles).map((route) => {
    allRoutes.push(...route.default)
  })

  return allRoutes
}
