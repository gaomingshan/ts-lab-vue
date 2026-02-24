# Vue3 + TypeScript 练习项目

这是一个专门用于练习 TypeScript 在 Vue3 中工程化使用的项目，重点展示 TS 类型设计、组件类型、API 类型、状态类型等最佳实践。

## 🎯 项目目标

- 练习 TypeScript 在 Vue3 中的工程化使用
- 重点在 TS 类型设计、组件类型、API 类型、状态类型
- Vue 只是运行环境，核心练习 TS

## 📦 技术栈

- **Vue 3** - 使用 Composition API
- **TypeScript** - 严格模式，完整的类型约束
- **Vite** - 现代化的构建工具
- **Vue Router** - 路由管理
- **Pinia** - 状态管理
- **Axios** - HTTP 请求封装

## 📁 项目结构

```
ts-lab-vue/
├── src/
│   ├── api/                  # API 层封装
│   │   ├── request.ts       # HTTP 请求封装（泛型支持）
│   │   ├── user.ts          # 用户相关 API
│   │   └── index.ts         # API 统一导出
│   ├── components/          # 组件
│   │   ├── UserTable.vue    # 用户表格组件
│   │   └── Pagination.vue   # 分页组件
│   ├── views/               # 页面
│   │   ├── Home.vue         # 首页
│   │   ├── UserList.vue     # 用户列表页（核心示例）
│   │   ├── Login.vue        # 登录页
│   │   └── NotFound.vue     # 404 页面
│   ├── stores/              # Pinia Store
│   │   ├── user.ts          # 用户状态管理
│   │   ├── app.ts           # 应用全局状态
│   │   └── index.ts         # Store 统一导出
│   ├── router/              # 路由配置
│   │   └── index.ts         # 路由定义
│   ├── types/               # 类型定义（核心）
│   │   ├── api.ts           # API 相关类型
│   │   ├── user.ts          # 用户业务类型
│   │   ├── store.ts         # Store 状态类型
│   │   ├── router.ts        # 路由类型
│   │   ├── component.ts     # 组件通用类型
│   │   └── index.ts         # 类型统一导出
│   ├── App.vue              # 根组件
│   ├── main.ts              # 应用入口
│   ├── style.css            # 全局样式
│   └── vite-env.d.ts        # Vite 环境类型
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目说明
```

## 🎓 核心学习点

### 1. 类型定义（`src/types/`）

- **API 类型**：统一的响应格式、分页类型、请求配置
- **业务模型**：用户类型、枚举、DTO 类型
- **Store 类型**：状态类型、Actions 类型约束
- **组件类型**：Props、Emits 类型定义

### 2. API 层封装（`src/api/`）

- 使用泛型封装 HTTP 请求
- 完整的类型推导
- 统一的错误处理
- 请求拦截器和响应拦截器

### 3. Pinia Store（`src/stores/`）

- Composition API 风格
- 完整的类型约束
- Computed 类型推导
- Actions 返回值类型

### 4. 组件类型（`src/components/`）

- Props 接口定义
- Emits 类型约束
- 泛型组件示例
- 双向绑定类型

### 5. 路由类型（`src/router/`）

- 路由元数据类型扩展
- 导航守卫类型
- 路由参数类型

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

## 📝 TypeScript 使用示例

### 1. API 调用

```typescript
import { userApi } from '@/api'
import type { UserListParams, PaginationResponse, UserListItem } from '@/types'

const params: UserListParams = {
  page: 1,
  pageSize: 10,
  status: 'active'
}

const response: PaginationResponse<UserListItem> = await userApi.getUserList(params)
```

### 2. Store 使用

```typescript
import { useUserStore } from '@/stores'

const userStore = useUserStore()

// 类型推导
const userName: string = userStore.userName
const isAuthenticated: boolean = userStore.isAuthenticated

// 方法调用
await userStore.login('username', 'password')
```

### 3. 组件 Props

```typescript
interface Props {
  users: UserListItem[]
  loading?: boolean
}

interface Emits {
  (e: 'view', user: UserListItem): void
  (e: 'delete', userId: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()
```

## 🎯 练习建议

1. **类型定义练习**
   - 扩展现有类型
   - 创建新的业务模型
   - 练习泛型、工具类型

2. **API 封装练习**
   - 添加新的 API 接口
   - 实现请求取消
   - 添加请求缓存

3. **Store 练习**
   - 创建新的 Store
   - 实现 Store 组合
   - 添加持久化

4. **组件练习**
   - 创建新的通用组件
   - 实现组件泛型
   - 封装业务组件

## ⚠️ 注意事项

- 项目使用 TypeScript 严格模式，禁止使用 `any`
- 所有类型必须显式声明
- API 调用是模拟的，实际会失败（用于练习）
- 重点关注类型设计和使用，而非 UI 实现

## 📚 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue Router 官方文档](https://router.vuejs.org/)

## 📄 License

MIT
