# 项目结构说明

## 📁 完整目录结构

```
ts-lab-vue/
├── src/
│   ├── api/                      # API 层封装
│   │   ├── request.ts           # HTTP 客户端封装（核心）
│   │   ├── user.ts              # 用户 API 接口
│   │   └── index.ts             # 统一导出
│   │
│   ├── components/              # 通用组件
│   │   ├── UserTable.vue        # 用户表格组件
│   │   └── Pagination.vue       # 分页组件
│   │
│   ├── views/                   # 页面组件
│   │   ├── Home.vue             # 首页
│   │   ├── UserList.vue         # 用户列表页（核心示例）
│   │   ├── Login.vue            # 登录页
│   │   └── NotFound.vue         # 404 页面
│   │
│   ├── stores/                  # Pinia 状态管理
│   │   ├── user.ts              # 用户状态
│   │   ├── app.ts               # 应用全局状态
│   │   └── index.ts             # 统一导出
│   │
│   ├── router/                  # 路由配置
│   │   └── index.ts             # 路由定义和守卫
│   │
│   ├── types/                   # TypeScript 类型定义（核心）
│   │   ├── api.ts               # API 响应类型、请求配置
│   │   ├── user.ts              # 用户业务模型
│   │   ├── store.ts             # Store 状态类型
│   │   ├── router.ts            # 路由元数据类型
│   │   ├── component.ts         # 组件通用类型
│   │   └── index.ts             # 统一导出
│   │
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 应用入口
│   ├── style.css                # 全局样式
│   └── vite-env.d.ts            # Vite 环境类型声明
│
├── index.html                   # HTML 入口
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript 配置（严格模式）
├── tsconfig.node.json           # Node 环境 TS 配置
├── vite.config.ts               # Vite 配置
├── .env                         # 环境变量
├── .env.development             # 开发环境变量
├── .gitignore                   # Git 忽略文件
└── README.md                    # 项目说明
```

## 🎯 模块设计说明

### 1. Types 模块（`src/types/`）

**设计目的**：集中管理所有 TypeScript 类型定义，确保类型复用和一致性

#### `api.ts` - API 类型
- `ApiResponse<T>`：统一的 API 响应格式（泛型）
- `PaginationParams`：分页请求参数
- `PaginationResponse<T>`：分页响应格式（泛型）
- `RequestConfig`：HTTP 请求配置

#### `user.ts` - 用户业务类型
- `User`：完整用户信息
- `UserRole`：用户角色枚举
- `UserStatus`：用户状态枚举
- `CreateUserDTO`、`UpdateUserDTO`：DTO 类型
- `UserProfile`、`UserListItem`：使用工具类型派生

#### `store.ts` - Store 状态类型
- `UserState`：用户状态接口
- `AppState`：应用状态接口
- `UserStoreActions`、`AppStoreActions`：Actions 类型约束

#### `router.ts` - 路由类型
- `RouteMeta`：路由元数据接口
- `AppRouteRecordRaw`：扩展的路由记录类型

#### `component.ts` - 组件类型
- `TableColumn<T>`：表格列定义（泛型）
- `ButtonProps`：按钮组件 Props
- `PaginationProps`、`PaginationEmits`：分页组件类型

### 2. API 模块（`src/api/`）

**设计目的**：封装所有 HTTP 请求，提供类型安全的 API 调用

#### `request.ts` - HTTP 客户端
```typescript
class HttpClient {
  // 泛型方法，自动推导返回类型
  async get<T>(url: string): Promise<T>
  async post<T>(url: string, data?: unknown): Promise<T>
}
```

**核心特性**：
- 使用泛型支持类型推导
- 请求/响应拦截器
- 统一错误处理
- Token 自动注入

#### `user.ts` - 用户 API
```typescript
export const userApi = {
  getUserList(params: UserListParams): Promise<PaginationResponse<UserListItem>>
  getUserById(id: number): Promise<User>
  login(username: string, password: string): Promise<{ token: string; user: UserProfile }>
}
```

**学习重点**：
- 每个方法都有明确的参数和返回类型
- 使用泛型确保类型安全
- 返回值类型自动推导

### 3. Store 模块（`src/stores/`）

**设计目的**：使用 Pinia + Composition API 管理状态，完整的 TypeScript 支持

#### `user.ts` - 用户 Store
```typescript
export const useUserStore = defineStore('user', () => {
  // State
  const currentUser = ref<User | null>(null)
  const token = ref<string | null>(null)
  
  // Getters (computed)
  const isAuthenticated = computed<boolean>(() => ...)
  const userName = computed<string>(() => ...)
  
  // Actions
  async function login(username: string, password: string): Promise<void> {}
  
  return { currentUser, token, isAuthenticated, userName, login }
})
```

**学习重点**：
- `ref` 和 `computed` 的类型标注
- 异步 Actions 的类型定义
- Store 返回对象的类型推导

#### `app.ts` - 应用 Store
- 主题切换
- 国际化
- 全局加载状态

### 4. Router 模块（`src/router/`）

**设计目的**：配置路由，添加类型安全的路由守卫

```typescript
const routes: AppRouteRecordRaw[] = [
  {
    path: '/users',
    component: () => import('@/views/UserList.vue'),
    meta: {
      title: '用户列表',
      requiresAuth: true,
      roles: ['admin', 'user']
    }
  }
]
```

**学习重点**：
- 路由元数据的类型扩展
- 导航守卫的类型标注
- 路由懒加载

### 5. Components 模块（`src/components/`）

**设计目的**：创建可复用的类型安全组件

#### `UserTable.vue`
```typescript
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
```

**学习重点**：
- Props 接口定义
- Emits 事件类型约束
- `withDefaults` 设置默认值

#### `Pagination.vue`
- 双向绑定类型（`v-model`）
- 复杂计算属性类型
- 事件参数类型

### 6. Views 模块（`src/views/`）

**设计目的**：展示完整的页面级组件，集成所有模块

#### `UserList.vue` - 核心示例页面
```typescript
// 状态定义
const users = ref<UserListItem[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)

// 计算属性
const queryParams = computed<UserListParams>(() => ({
  page: currentPage.value,
  pageSize: pageSize.value,
  ...
}))

// 异步方法
async function fetchUsers(): Promise<void> {
  const response: PaginationResponse<UserListItem> = 
    await userApi.getUserList(queryParams.value)
  users.value = response.list
}
```

**学习重点**：
- 完整的类型标注流程
- Store、API、组件的集成使用
- 异步数据处理
- 事件处理函数类型

## 🔑 TypeScript 核心知识点

### 1. 泛型（Generics）
```typescript
// API 响应泛型
interface ApiResponse<T> {
  data: T
}

// 使用
const response: ApiResponse<User> = await api.get('/user')
```

### 2. 工具类型（Utility Types）
```typescript
// Pick：选择部分属性
type UserProfile = Pick<User, 'id' | 'username' | 'email'>

// Omit：排除部分属性
type UserListItem = Omit<User, 'updatedAt'>

// Partial：所有属性可选
function updateUser(data: Partial<User>) {}
```

### 3. 枚举（Enums）
```typescript
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

### 4. 类型推导
```typescript
// Pinia Store 自动推导
const userStore = useUserStore()
// TypeScript 知道 userStore.userName 是 string
```

### 5. 类型守卫
```typescript
if (currentUser.value) {
  // TypeScript 知道这里 currentUser 不是 null
  console.log(currentUser.value.username)
}
```

## 📚 后续扩展建议

1. **添加更多业务模块**
   - 创建产品、订单等业务模型
   - 实现对应的 API 和 Store

2. **高级类型练习**
   - 条件类型（Conditional Types）
   - 映射类型（Mapped Types）
   - 模板字面量类型

3. **工具函数封装**
   - 类型安全的工具函数
   - 自定义 Hooks

4. **表单处理**
   - 表单验证类型
   - 表单状态管理

5. **权限系统**
   - 基于类型的权限控制
   - 路由权限守卫

## ⚡ 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 构建
npm run build
```

## 💡 学习路径建议

1. **第一步**：阅读 `src/types/` 下的所有类型定义，理解类型设计
2. **第二步**：查看 `src/api/request.ts`，学习泛型封装
3. **第三步**：研究 `src/stores/user.ts`，理解 Pinia 的类型使用
4. **第四步**：阅读 `src/views/UserList.vue`，看完整的集成示例
5. **第五步**：尝试添加新功能，练习类型定义

## 🎓 注意事项

- 当前项目的 TypeScript 配置启用了严格模式
- 禁止使用 `any` 类型
- 所有函数参数和返回值都需要类型标注
- 优先使用类型推导，但关键位置要显式声明
