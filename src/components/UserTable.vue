<script setup lang="ts">
/**
 * 用户表格组件
 * 目的：展示组件 Props 和 Emits 的类型定义
 */

import { computed } from 'vue'
import type { User, UserListItem } from '@/types'

interface Props {
  users: UserListItem[]
  loading?: boolean
}

interface Emits {
  (e: 'view', user: UserListItem): void
  (e: 'edit', user: UserListItem): void
  (e: 'delete', userId: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const tableColumns = computed(() => [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'username', label: '用户名', width: '150px' },
  { key: 'email', label: '邮箱', width: '200px' },
  { key: 'role', label: '角色', width: '100px' },
  { key: 'status', label: '状态', width: '100px' },
  { key: 'createdAt', label: '创建时间', width: '180px' },
  { key: 'actions', label: '操作', width: '200px' }
])

function handleView(user: UserListItem): void {
  emit('view', user)
}

function handleEdit(user: UserListItem): void {
  emit('edit', user)
}

function handleDelete(userId: number): void {
  if (confirm('确认删除该用户吗？')) {
    emit('delete', userId)
  }
}

function getRoleName(role: string): string {
  const roleMap: Record<string, string> = {
    admin: '管理员',
    user: '普通用户',
    guest: '访客'
  }
  return roleMap[role] || role
}

function getStatusName(status: string): string {
  const statusMap: Record<string, string> = {
    active: '激活',
    inactive: '未激活',
    banned: '已禁用'
  }
  return statusMap[status] || status
}
</script>

<template>
  <div class="user-table">
    <div v-if="loading" class="loading">加载中...</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th v-for="col in tableColumns" :key="col.key" :style="{ width: col.width }">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ getRoleName(user.role) }}</td>
          <td>{{ getStatusName(user.status) }}</td>
          <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
          <td class="actions">
            <button @click="handleView(user)" class="btn btn-primary">查看</button>
            <button @click="handleEdit(user)" class="btn btn-success">编辑</button>
            <button @click="handleDelete(user.id)" class="btn btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!loading && users.length === 0" class="empty">
      暂无数据
    </div>
  </div>
</template>

<style scoped>
.user-table {
  width: 100%;
  overflow-x: auto;
}

.loading,
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.table th {
  background: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.table tbody tr:hover {
  background: #fafafa;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background: #409eff;
  color: white;
}

.btn-success {
  background: #67c23a;
  color: white;
}

.btn-danger {
  background: #f56c6c;
  color: white;
}
</style>
