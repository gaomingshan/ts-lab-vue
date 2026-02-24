/**
 * Axios 请求封装
 * 目的：提供统一的 HTTP 请求方法，支持泛型响应类型
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { ApiResponse } from '@/types'

class HttpClient {
  private instance: AxiosInstance

  constructor(baseURL: string, timeout: number = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { code, message } = response.data
        
        if (code !== 200) {
          console.error(`API Error: ${message}`)
          return Promise.reject(new Error(message))
        }
        
        return response
      },
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status
          const errorMessage = this.getErrorMessage(status)
          console.error(`HTTP Error ${status}: ${errorMessage}`)
        }
        return Promise.reject(error)
      }
    )
  }

  private getErrorMessage(status: number): string {
    const errorMessages: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    }
    return errorMessages[status] || 'Unknown Error'
  }

  public async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.request<ApiResponse<T>>(config)
    return response.data.data
  }

  public async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  public async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  public async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  public async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }

  public async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }
}

export const http = new HttpClient(import.meta.env.VITE_API_BASE_URL || '/api')

export default http
