export interface ISongDetail {
  id: number
  name: string
  dt: number
  al: {
    id: number
    name: string
    picUrl: string
    tns: any[]
    pic_str: string
    pic: number
  }
  ar: { id: number; name: string; tns: any[]; alias: any[] }[]
}

export interface ILyric {
  time: number
  text: string
}
