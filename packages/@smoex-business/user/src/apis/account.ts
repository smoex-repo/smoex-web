import { proxyClient } from '../utils/request'

type IAccountLoginParams = {
  account: string
  password: string
}

export const accountAPI = {
  getInfo: () => proxyClient.get('/account/info'),
  logout: () => proxyClient.get('/account/logout'),
  login: (params: IAccountLoginParams) =>
    proxyClient.post('/account/login', params),
  register: (params: any) => proxyClient.post('/account/register', params),
}
