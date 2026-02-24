<script setup lang="ts">
/**
 * 404 页面
 */

import { useRouter } from 'vue-router'

const router = useRouter()

function goHome(): void {
  router.push('/')
}
</script>

<template>
  <div class="not-found-page">
    <div class="content">
      <h1>404</h1>
      <p>页面不存在</p>
      <button @click="goHome" class="btn">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.content {
  text-align: center;
}

.content h1 {
  font-size: 120px;
  font-weight: 700;
  color: #409eff;
  margin-bottom: 16px;
}

.content p {
  font-size: 24px;
  color: #666;
  margin-bottom: 32px;
}

.btn {
  padding: 12px 32px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}
</style>
