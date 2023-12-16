import { mapModuleToRoutes } from './utils'
import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [...mapModuleToRoutes()]

export default routes
