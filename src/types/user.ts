/**
 * 用户相关类型定义
 * 目的：定义用户业务模型和相关接口
 */

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export interface User {
  id: number
  username: string
  email: string
  avatar: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export interface UserListParams {
  page: number
  pageSize: number
  status?: UserStatus
  role?: UserRole
  keyword?: string
}

export interface CreateUserDTO {
  username: string
  email: string
  password: string
  role?: UserRole
}

export interface UpdateUserDTO {
  username?: string
  email?: string
  avatar?: string
  role?: UserRole
  status?: UserStatus
}

export type UserProfile = Pick<User, 'id' | 'username' | 'email' | 'avatar' | 'role'>

export type UserListItem = Omit<User, 'updatedAt'>
