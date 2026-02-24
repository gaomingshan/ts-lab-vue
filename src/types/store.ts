/**
 * Store 状态类型定义
 * 目的：为 Pinia Store 提供严格的类型约束
 */

import type { User, } from './user'

export interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  token: string | null
  permissions: string[]
}

export interface AppState {
  theme: 'light' | 'dark'
  locale: 'zh-CN' | 'en-US'
  sidebarCollapsed: boolean
  loading: boolean
}

export interface UserStoreActions {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (user: Partial<User>) => void
  checkPermission: (permission: string) => boolean
}

export interface AppStoreActions {
  toggleTheme: () => void
  setLocale: (locale: 'zh-CN' | 'en-US') => void
  toggleSidebar: () => void
  setLoading: (loading: boolean) => void
}
