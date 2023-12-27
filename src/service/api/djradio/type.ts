export interface ICatelist {
  id: number
  name: string
  picWebUrl: string
}

export interface IRadio {
  id: string
  name: string
  picUrl: string
  desc: string
  dj: { nickname: string }
  programCount: number
  subCount: number
}
