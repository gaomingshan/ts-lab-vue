<script setup lang="ts">
/**
 * 首页
 * 目的：简单的欢迎页面
 */

import { useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

function goToUserList(): void {
  router.push('/users')
}

function toggleTheme(): void {
  appStore.toggleTheme()
}
</script>

<template>
  <div class="home-page">
    <div class="welcome-card">
      <h1>Vue3 + TypeScript 练习项目</h1>
      <p class="subtitle">展示 TypeScript 在 Vue3 工程化中的最佳实践</p>

      <div class="features">
        <div class="feature-item">
          <h3>✓ 严格类型检查</h3>
          <p>启用 TypeScript 严格模式，确保代码类型安全</p>
        </div>
        <div class="feature-item">
          <h3>✓ API 层封装</h3>
          <p>使用泛型封装 HTTP 请求，提供完整的类型推导</p>
        </div>
        <div class="feature-item">
          <h3>✓ Pinia 状态管理</h3>
          <p>Composition API 风格的 Store，完整的类型支持</p>
        </div>
        <div class="feature-item">
          <h3>✓ 路由类型安全</h3>
          <p>扩展 Vue Router 类型，添加自定义元数据</p>
        </div>
      </div>

      <div class="actions">
        <button @click="goToUserList" class="btn btn-primary">
          查看用户列表示例
        </button>
        <button @click="toggleTheme" class="btn btn-default">
          切换主题 (当前: {{ appStore.theme }})
        </button>
      </div>

      <div class="info">
        <p v-if="userStore.isAuthenticated">
          欢迎回来，{{ userStore.userName }}！
        </p>
        <p v-else>
          当前未登录
        </p>
      </div>
    </div>

    <div class="tech-stack">
      <h2>技术栈</h2>
      <ul>
        <li>Vue 3 (Composition API)</li>
        <li>TypeScript (严格模式)</li>
        <li>Vite</li>
        <li>Vue Router</li>
        <li>Pinia</li>
        <li>Axios</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 40px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  padding: 48px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.welcome-card h1 {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.feature-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.feature-item h3 {
  font-size: 18px;
  color: #409eff;
  margin-bottom: 8px;
}

.feature-item p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background: #409eff;
  color: white;
}

.btn-default {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.info {
  padding-top: 24px;
  border-top: 1px solid #eee;
  color: #666;
}

.tech-stack {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-stack h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.tech-stack ul {
  list-style: none;
  padding: 0;
}

.tech-stack li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 16px;
}

.tech-stack li:last-child {
  border-bottom: none;
}
</style>
