import { ISongCategory, ISongCategoryData } from '@/service/api/playlist/type'

export function handleSongsCategory(data: ISongCategoryData) {
  // 1.获取所有的类别
  const category = data.categories

  // 2.创建类别数据结构
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryData = Object.entries(category).map(([_, value]) => {
    return {
      name: value,
      subs: [] as ISongCategory[]
    }
  })

  // 3.将subs添加到对应的类别中
  for (const item of data.sub) {
    categoryData[item.category].subs.push(item)
  }

  return categoryData
}
