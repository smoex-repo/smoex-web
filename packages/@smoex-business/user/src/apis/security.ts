import { proxyClient } from '../utils/request'

type ISendCodeParams = {
  target: string
}

type IVerifyCodeParams = {
  code: number
  scene: 'login' | 'register'
}

export const securityAPI = {
  sendCode: (params: ISendCodeParams) =>
    proxyClient.post('/security/sendcode', params),
  verifyCode: (params: IVerifyCodeParams) =>
    proxyClient.post('/security/verifycode', params),
}
