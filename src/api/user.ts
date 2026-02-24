/**
 * 用户相关 API
 * 目的：封装所有用户相关的 API 请求，展示类型安全的 API 调用
 */

import http from './request'
import type { 
  User, 
  UserListParams, 
  UserListItem,
  CreateUserDTO, 
  UpdateUserDTO,
  UserProfile,
  PaginationResponse 
} from '@/types'

export const userApi = {
  getUserList(params: UserListParams): Promise<PaginationResponse<UserListItem>> {
    return http.get<PaginationResponse<UserListItem>>('/users', { params })
  },

  getUserById(id: number): Promise<User> {
    return http.get<User>(`/users/${id}`)
  },

  getCurrentUser(): Promise<UserProfile> {
    return http.get<UserProfile>('/users/me')
  },

  createUser(data: CreateUserDTO): Promise<User> {
    return http.post<User>('/users', data)
  },

  updateUser(id: number, data: UpdateUserDTO): Promise<User> {
    return http.put<User>(`/users/${id}`, data)
  },

  deleteUser(id: number): Promise<void> {
    return http.delete<void>(`/users/${id}`)
  },

  login(username: string, password: string): Promise<{ token: string; user: UserProfile }> {
    return http.post<{ token: string; user: UserProfile }>('/auth/login', {
      username,
      password
    })
  },

  logout(): Promise<void> {
    return http.post<void>('/auth/logout')
  }
}

export default userApi
