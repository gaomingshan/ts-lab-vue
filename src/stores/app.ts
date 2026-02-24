/**
 * 应用全局 Store
 * 目的：管理应用级别的全局状态
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

type Theme = 'light' | 'dark'
type Locale = 'zh-CN' | 'en-US'

export const useAppStore = defineStore('app', () => {
  const theme = ref<Theme>('light')
  const locale = ref<Locale>('zh-CN')
  const sidebarCollapsed = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const isDarkMode = computed<boolean>(() => theme.value === 'dark')
  
  const isZhCN = computed<boolean>(() => locale.value === 'zh-CN')

  function toggleTheme(): void {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
  }

  function setTheme(newTheme: Theme): void {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  function setLocale(newLocale: Locale): void {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  function toggleSidebar(): void {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setLoading(isLoading: boolean): void {
    loading.value = isLoading
  }

  function initializeApp(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const savedLocale = localStorage.getItem('locale') as Locale | null
    
    if (savedTheme) {
      theme.value = savedTheme
    }
    
    if (savedLocale) {
      locale.value = savedLocale
    }
  }

  return {
    theme,
    locale,
    sidebarCollapsed,
    loading,
    isDarkMode,
    isZhCN,
    toggleTheme,
    setTheme,
    setLocale,
    toggleSidebar,
    setLoading,
    initializeApp
  }
})
