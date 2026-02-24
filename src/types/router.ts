/**
 * 路由类型定义
 * 目的：扩展 Vue Router 的类型，添加自定义元数据
 */

import type { RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  title?: string
  icon?: string
  requiresAuth?: boolean
  roles?: string[]
  keepAlive?: boolean
}

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: RouteMeta
}
