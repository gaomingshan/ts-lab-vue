/**
 * 组件通用类型定义
 * 目的：定义组件 Props 和 Emits 的通用类型
 */

export interface TableColumn<T = unknown> {
  key: keyof T | string
  label: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  formatter?: (value: unknown, row: T) => string
}

export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

export interface PaginationProps {
  total: number
  currentPage: number
  pageSize: number
  pageSizes?: number[]
}

export interface PaginationEmits {
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  'change': [page: number, pageSize: number]
}

export type EmitFn<T> = (event: keyof T, ...args: T[keyof T] extends unknown[] ? T[keyof T] : [T[keyof T]]) => void
