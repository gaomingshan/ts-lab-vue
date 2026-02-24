/**
 * 用户 Store
 * 目的：管理用户认证状态，展示 Pinia 的 TypeScript 使用
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api'
import type { User, } from '@/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const permissions = ref<string[]>([])

  const isAuthenticated = computed<boolean>(() => !!token.value && !!currentUser.value)

  const userRole = computed<string>(() => currentUser.value?.role || 'guest')

  const userName = computed<string>(() => currentUser.value?.username || 'Anonymous')

  async function login(username: string, password: string): Promise<void> {
    try {
      const response = await userApi.login(username, password)

      token.value = response.token
      currentUser.value = response.user as User

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  function logout(): void {
    currentUser.value = null
    token.value = null
    permissions.value = []

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function fetchCurrentUser(): Promise<void> {
    try {
      const user = await userApi.getCurrentUser()
      currentUser.value = user as User
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    }
  }

  function updateProfile(user: Partial<User>): void {
    if (currentUser.value) {
      currentUser.value = { ...currentUser.value, ...user }
      localStorage.setItem('user', JSON.stringify(currentUser.value))
    }
  }

  function checkPermission(permission: string): boolean {
    return permissions.value.includes(permission)
  }

  function setPermissions(newPermissions: string[]): void {
    permissions.value = newPermissions
  }

  return {
    currentUser,
    token,
    permissions,
    isAuthenticated,
    userRole,
    userName,
    login,
    logout,
    fetchCurrentUser,
    updateProfile,
    checkPermission,
    setPermissions
  }
})
