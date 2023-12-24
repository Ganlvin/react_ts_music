import request from '../../index'
import type { IUserLoginProfile } from './type'

enum mainAPI {
  GetQRLoginKey = '/login/qr/key',
  GetQRImg = '/login/qr/create',
  GetQrStatus = '/login/qr/check',
  PostCheckLoginStatus = '/login/status'
}

// 获取二维码之前需要的key
export function getQRLoginKeyRequest() {
  return request.get<{ data: { unikey: string } }>({
    url: mainAPI.GetQRLoginKey,
    params: { timestamp: Date.now() }
  })
}

// 获取二维码登录的码
export function getQRLoginImgRequest(key: string) {
  return request.get<{ data: { qrimg: string } }>({
    url: mainAPI.GetQRImg,
    params: { timestamp: Date.now(), qrimg: true, key }
  })
}

//二维码检测扫码状态接口
// 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功
export function getQRCheckStatus(key: string) {
  return request.get<{ code: number; cookie: string; message: string }>({
    url: mainAPI.GetQrStatus,
    params: { timestamp: Date.now(), key, noCookie: true }
  })
}

// 检查登录状态
export function PostCheckLoginStatus(cookie = '') {
  return request.get<{ data: { profile: IUserLoginProfile } }>({
    url: mainAPI.PostCheckLoginStatus,
    params: { timestamp: Date.now() },
    data: { cookie }
  })
}
