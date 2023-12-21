import request from '../../index'
import { IRanking } from '@/service/api/common/type'

enum mainAPI {
  GetRanking = '/playlist/detail'
}

// 获取排行榜
export function getRankingDetailRequest(id: number) {
  return request.get<{ playlist: IRanking }>({
    url: mainAPI.GetRanking,
    params: { id }
  })
}
