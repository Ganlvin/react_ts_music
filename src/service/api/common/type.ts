export interface IAlbum {
  name: string
  id: number
  type: string
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: string
  briefDesc: string
  artist: IArtist
  songs: any
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: any[]
  paid: boolean
  onSale: boolean
  picId_str: string
}

export interface IArtist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: string[]
  trans: string
  musicSize: number
  topicPerson: number
  picId_str: string
  img1v1Id_str: string
}

export interface IRanking {
  id: number
  coverImgUrl: string
  name: string
  updateTime: string
  subscribedCount: number
  shareCount: number
  commentCount: number
  playCount: number
  tracks: {
    id: number
    name: string
    ar: { name: string }[]
    fee: number
    al: { picUrl: string }
    dt: number
    videoInfo: {
      moreThanOne: boolean
      video: {
        vid: string
        type: number
        title: string
        playTime: number
        coverUrl: string
        publishTime: null
        artists: null
        alias: null
      } | null
    }
  }[]
}
