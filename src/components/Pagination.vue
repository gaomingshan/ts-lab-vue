<script setup lang="ts">
/**
 * 分页组件
 * 目的：展示组件双向绑定和事件类型定义
 */

import { computed } from 'vue'

interface Props {
  total: number
  currentPage: number
  pageSize: number
  pageSizes?: number[]
}

interface Emits {
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
  (e: 'change', page: number, pageSize: number): void
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 50, 100]
})

const emit = defineEmits<Emits>()

const totalPages = computed<number>(() => {
  return Math.ceil(props.total / props.pageSize)
})

const pages = computed<number[]>(() => {
  const current = props.currentPage
  const total = totalPages.value
  const pageList: number[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pageList.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageList.push(i)
      }
      pageList.push(-1)
      pageList.push(total)
    } else if (current >= total - 3) {
      pageList.push(1)
      pageList.push(-1)
      for (let i = total - 4; i <= total; i++) {
        pageList.push(i)
      }
    } else {
      pageList.push(1)
      pageList.push(-1)
      for (let i = current - 1; i <= current + 1; i++) {
        pageList.push(i)
      }
      pageList.push(-1)
      pageList.push(total)
    }
  }

  return pageList
})

function handlePageChange(page: number): void {
  if (page === props.currentPage || page < 1 || page > totalPages.value) {
    return
  }
  emit('update:currentPage', page)
  emit('change', page, props.pageSize)
}

function handleSizeChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  const size = Number(target.value)
  emit('update:pageSize', size)
  emit('update:currentPage', 1)
  emit('change', 1, size)
}

function handlePrev(): void {
  if (props.currentPage > 1) {
    handlePageChange(props.currentPage - 1)
  }
}

function handleNext(): void {
  if (props.currentPage < totalPages.value) {
    handlePageChange(props.currentPage + 1)
  }
}
</script>

<template>
  <div class="pagination">
    <div class="pagination-info">
      共 {{ total }} 条记录
    </div>
    
    <div class="pagination-size">
      <select :value="pageSize" @change="handleSizeChange">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }} 条/页
        </option>
      </select>
    </div>

    <div class="pagination-pages">
      <button 
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="handlePrev"
      >
        上一页
      </button>

      <button
        v-for="(page, index) in pages"
        :key="index"
        class="pagination-btn"
        :class="{ active: page === currentPage, ellipsis: page === -1 }"
        :disabled="page === -1"
        @click="handlePageChange(page)"
      >
        {{ page === -1 ? '...' : page }}
      </button>

      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="handleNext"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  justify-content: flex-end;
}

.pagination-info {
  color: #666;
  font-size: 14px;
}

.pagination-size select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.pagination-pages {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled):not(.ellipsis) {
  border-color: #409eff;
  color: #409eff;
}

.pagination-btn.active {
  background: #409eff;
  border-color: #409eff;
  color: white;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn.ellipsis {
  border: none;
  cursor: default;
}
</style>
