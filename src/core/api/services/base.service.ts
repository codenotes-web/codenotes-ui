import axiosInstance from '../client'
import type { ApiResponse } from '../types'

export class BaseService {
  protected baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  protected getUrl(path: string = ''): string {
    return `${ this.baseUrl }${ path }`
  }

  protected async get<T>(path: string = '', params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await axiosInstance.get(this.getUrl(path), {
      params
    })
    return response.data
  }

  protected async post<T>(path: string = '', data?: any): Promise<ApiResponse<T>> {
    const response = await axiosInstance.post(this.getUrl(path), data)
    return response.data
  }
}
