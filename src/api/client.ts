import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import config from '@/config'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
