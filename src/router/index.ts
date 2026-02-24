/**
 * 路由配置
 * 目的：定义应用路由，展示路由类型的使用
 */

import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { AppRouteRecordRaw } from '@/types'
import { useUserStore } from '@/stores'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import('@/views/UserList.vue'),
    meta: {
      title: '用户列表',
      requiresAuth: true,
      roles: ['admin', 'user']
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
})

router.beforeEach((
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const userStore = useUserStore()
  const requiresAuth = to.meta.requiresAuth as boolean | undefined

  if (requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

router.afterEach((to: RouteLocationNormalized): void => {
  const title = to.meta.title as string | undefined
  if (title) {
    document.title = `${title} - Vue3 TS Practice`
  }
})

export default router
