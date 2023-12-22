export interface ISongCategoryData {
  all: ISongCategory[]
  sub: ISongCategory[]
  categories: categoriesType
}

export interface ISongCategory {
  name: string
  resourceCount: number
  imgId: number
  imgUrl: any
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}

export type categoriesType = {
  '0': '语种'
  '1': '风格'
  '2': '场景'
  '3': '情感'
  '4': '主题'
}

export type playListQuery = { cat: string; offset: number; limit: number }
