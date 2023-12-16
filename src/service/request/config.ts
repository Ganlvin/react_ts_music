// 2.根据process.env.NODE_ENV区分
// 在npm run built/dev 时候会自动变pro/dev 环境
// 开发环境: development
// 生成环境: production
// 测试环境: test

const BASE_URL = import.meta.env.VITE_BASE_URL
// 1000 = 1秒
const TIME_OUT = 1000 * 60

export { BASE_URL, TIME_OUT }
