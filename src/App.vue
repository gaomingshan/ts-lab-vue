<script setup lang="ts">
/**
 * 根组件
 * 目的：应用的根组件，提供路由出口
 */

import { onMounted } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

onMounted(() => {
  appStore.initializeApp()
})
</script>

<template>
  <div id="app" :class="{ 'dark-mode': appStore.isDarkMode }">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}

#app {
  min-height: 100vh;
}

#app.dark-mode {
  background: #1a1a1a;
  color: #fff;
}
</style>
