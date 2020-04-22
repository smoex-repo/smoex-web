import AxiosClient from 'axios'
import * as qs from 'qs'

export class APIError {
  public code: number
  public message: string
  public info: any

  constructor(code: number, message: string, info?: any) {
    this.code = code
    this.message = message
    this.info = info
  }
}

const transformResponse = (body: any) => {
  if (body.code === 0) {
    return body.data
  } else {
    // return data
    throw new APIError(-1, body.data.message, body.data)
  }
}

export const proxyClient = AxiosClient.create({
  baseURL: '/api',
  timeout: 100000,
  withCredentials: true,
  responseType: 'json',
  transformResponse,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: (params: any) => {
    if (params instanceof FormData) {
      return params
    }
    return qs.stringify(params)
  },
})

export const apiClient = AxiosClient.create({
  baseURL: 'https://api.smoex.com',
  timeout: 100000,
  withCredentials: true,
  responseType: 'json',
  transformResponse,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: (params: any) => {
    if (params instanceof FormData) {
      return params
    }
    return qs.stringify(params)
  },
})

proxyClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

export const withFormData = (params: any) => {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })
  return formData
}
