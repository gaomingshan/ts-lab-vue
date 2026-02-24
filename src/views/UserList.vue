<script setup lang="ts">
/**
 * 用户列表页面
 * 目的：展示完整的 TypeScript + Vue3 + Pinia + API 的集成使用
 */

import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores'
import { userApi } from '@/api'
import UserTable from '@/components/UserTable.vue'
import Pagination from '@/components/Pagination.vue'
import type { UserListItem, UserListParams, UserStatus, UserRole, PaginationResponse } from '@/types'

const userStore = useUserStore()

const users = ref<UserListItem[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

const searchForm = ref<{
  keyword: string
  status: UserStatus | ''
  role: UserRole | ''
}>({
  keyword: '',
  status: '',
  role: ''
})

const queryParams = computed<UserListParams>(() => {
  const params: UserListParams = {
    page: currentPage.value,
    pageSize: pageSize.value
  }

  if (searchForm.value.keyword) {
    params.keyword = searchForm.value.keyword
  }

  if (searchForm.value.status) {
    params.status = searchForm.value.status as UserStatus
  }

  if (searchForm.value.role) {
    params.role = searchForm.value.role as UserRole
  }

  return params
})

async function fetchUsers(): Promise<void> {
  try {
    loading.value = true
    const response: PaginationResponse<UserListItem> = await userApi.getUserList(queryParams.value)
    
    users.value = response.list
    total.value = response.total
  } catch (error) {
    console.error('Failed to fetch users:', error)
    users.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

function handleSearch(): void {
  currentPage.value = 1
  fetchUsers()
}

function handleReset(): void {
  searchForm.value = {
    keyword: '',
    status: '',
    role: ''
  }
  currentPage.value = 1
  fetchUsers()
}

function handlePageChange(page: number, size: number): void {
  currentPage.value = page
  pageSize.value = size
  fetchUsers()
}

function handleView(user: UserListItem): void {
  console.log('View user:', user)
  alert(`查看用户: ${user.username}`)
}

function handleEdit(user: UserListItem): void {
  console.log('Edit user:', user)
  alert(`编辑用户: ${user.username}`)
}

async function handleDelete(userId: number): Promise<void> {
  try {
    await userApi.deleteUser(userId)
    alert('删除成功')
    fetchUsers()
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert('删除失败')
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="user-list-page">
    <div class="page-header">
      <h1>用户列表</h1>
      <div class="user-info">
        <span>当前用户：{{ userStore.userName }}</span>
        <span>角色：{{ userStore.userRole }}</span>
      </div>
    </div>

    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>关键词：</label>
          <input 
            v-model="searchForm.keyword" 
            type="text" 
            placeholder="搜索用户名或邮箱"
            class="input"
          />
        </div>

        <div class="form-item">
          <label>状态：</label>
          <select v-model="searchForm.status" class="select">
            <option value="">全部</option>
            <option value="active">激活</option>
            <option value="inactive">未激活</option>
            <option value="banned">已禁用</option>
          </select>
        </div>

        <div class="form-item">
          <label>角色：</label>
          <select v-model="searchForm.role" class="select">
            <option value="">全部</option>
            <option value="admin">管理员</option>
            <option value="user">普通用户</option>
            <option value="guest">访客</option>
          </select>
        </div>

        <div class="form-actions">
          <button @click="handleSearch" class="btn btn-primary">搜索</button>
          <button @click="handleReset" class="btn btn-default">重置</button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <UserTable
        :users="users"
        :loading="loading"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <Pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      @change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.user-list-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.user-info {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 14px;
}

.search-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #666;
}

.input,
.select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 200px;
}

.input:focus,
.select:focus {
  outline: none;
  border-color: #409eff;
}

.form-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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
}

.table-container {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
