/**
 * API 响应基础类型定义
 * 目的：统一 API 响应格式，提供泛型支持
 */

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  timestamp: number
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export interface RequestConfig {
  method?: RequestMethod
  headers?: Record<string, string>
  params?: Record<string, unknown>
  data?: unknown
  timeout?: number
}
