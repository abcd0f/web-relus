# 命名规范

## 概述

良好的命名是代码自文档化的基础。本规范定义了项目中各类标识符的命名约定，旨在提高代码的可读性、可维护性和团队协作效率。

## 通用命名原则

### 核心理念

1. **见名知意**: 命名应该清晰地表达其用途和含义
2. **保持一致**: 相同类型的标识符使用统一的命名风格
3. **避免歧义**: 避免容易混淆或误解的命名
4. **简洁明了**: 在表达清楚的前提下尽量简洁
5. **英文优先**: 使用英文命名，避免拼音或中英混合

### 基本规则

```javascript
// ✅ 推荐的命名
const userName = 'john_doe';
const isLoggedIn = true;
const maxRetryCount = 3;
const calculateTotalPrice = items => {
  /* ... */
};
const UserManager = class {
  /* ... */
};
const API_BASE_URL = 'https://api.example.com';

// ❌ 避免的命名
const a = 'john_doe'; // 无意义
const flag = true; // 不明确
const temp = 3; // 临时变量名
const func = items => {}; // 无描述性
const obj = class {}; // 无意义
const url = 'https://api.example.com'; // 不够具体
```

## JavaScript/TypeScript 命名规范

### 变量和函数命名

#### 驼峰命名法 (camelCase)

```javascript
// ✅ 变量命名
const firstName = 'John';
const lastName = 'Doe';
const isUserActive = true;
const hasPermission = false;
const currentUserAge = 25;
const maxConnectionCount = 100;

// ✅ 函数命名 - 动词开头
const getUserById = id => {
  /* ... */
};
const validateEmail = email => {
  /* ... */
};
const calculateTotalAmount = items => {
  /* ... */
};
const formatCurrency = amount => {
  /* ... */
};
const processPayment = payment => {
  /* ... */
};

// ✅ 布尔值命名 - is/has/can/should/will 等开头
const isLoading = false;
const hasData = true;
const canEdit = false;
const shouldValidate = true;
const willRetry = false;
```

#### 具体的命名模式

```javascript
// ✅ 集合类型命名 - 使用复数
const users = [];
const orderItems = [];
const errorMessages = [];
const validationRules = [];

// ✅ 索引和计数器
const userIndex = 0;
const itemCount = items.length;
const retryAttempts = 0;
const currentPage = 1;

// ✅ 事件处理器命名
const handleUserClick = event => {
  /* ... */
};
const onFormSubmit = data => {
  /* ... */
};
const handleApiError = error => {
  /* ... */
};
const onDataLoad = data => {
  /* ... */
};

// ✅ 异步操作命名
const fetchUserData = async userId => {
  /* ... */
};
const saveUserProfile = async profile => {
  /* ... */
};
const loadConfigFile = async path => {
  /* ... */
};
```

### 类和构造函数命名

#### PascalCase

```javascript
// ✅ 类命名
class UserManager {
  constructor(config) {
    this.config = config;
  }
}

class PaymentProcessor {
  processCredit(amount) {
    /* ... */
  }
  processDebit(amount) {
    /* ... */
  }
}

class DataValidator {
  validateEmail(email) {
    /* ... */
  }
  validatePhone(phone) {
    /* ... */
  }
}

// ✅ 构造函数
function DatabaseConnection(options) {
  this.host = options.host;
  this.port = options.port;
}

// ✅ 工厂函数
function createLogger(level) {
  return new Logger(level);
}

function buildApiClient(baseUrl) {
  return new ApiClient(baseUrl);
}
```

### 常量命名

#### 应尽量使用下划线命名法 (SNAKE_CASE)

```javascript
// ✅ 全局常量
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 5000;
const MAX_RETRY_ATTEMPTS = 3;
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed',
  VALIDATION_ERROR: 'Input validation failed',
  AUTH_ERROR: 'Authentication required'
};

// ✅ 枚举值
const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest'
};

const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// ✅ 配置常量
const CACHE_CONFIG = {
  DEFAULT_TTL: 3600,
  MAX_SIZE: 1000,
  CLEANUP_INTERVAL: 300
};
```

### 模块和命名空间

```javascript
// ✅ 模块导出命名
// userService.js
export const userService = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};

// ✅ 命名空间对象
const AuthUtils = {
  generateToken,
  validateToken,
  refreshToken
};

const ValidationHelpers = {
  validateEmail,
  validatePhone,
  validatePassword
};

// ✅ 默认导出类
// UserManager.js
export default class UserManager {
  // 实现
}

// ✅ 具名导出函数
// utils.js
export const formatDate = date => {
  /* ... */
};
export const calculateAge = birthDate => {
  /* ... */
};
export const generateId = () => {
  /* ... */
};
```

## TypeScript 特定命名

### 接口命名

```typescript
// ✅ 接口命名 - 不使用 I 前缀
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserConfig {
  theme: string;
  language: string;
  notifications: boolean;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ✅ 函数接口
interface EventHandler {
  (event: Event): void;
}

interface DataProcessor<T, R> {
  (input: T): R;
}
```

### 类型别名命名

```typescript
// ✅ 类型别名
type UserRole = 'admin' | 'user' | 'guest';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

// ✅ 泛型类型参数
interface Repository<TEntity, TKey = string> {
  findById(id: TKey): Promise<TEntity | null>;
  save(entity: TEntity): Promise<TEntity>;
  delete(id: TKey): Promise<boolean>;
}

interface ApiClient<TResponse = any, TError = Error> {
  get<T = TResponse>(url: string): Promise<T>;
  post<T = TResponse>(url: string, data: any): Promise<T>;
}

// ✅ 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

### 枚举命名

```typescript
// ✅ 枚举命名
enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Processing = 'processing',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3
}

enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}
```

## 组合式函数（hooks）

```javascript
// ✅ Composables 命名
// useUserData.js
export const useUserData = userId => {
  const user = ref(null);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchUser = async () => {
    // 获取用户数据
  };

  const updateUser = async userData => {
    // 更新用户数据
  };

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchUser,
    updateUser
  };
};

// ✅ Store 模块命名
// stores/userStore.js
export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null);
  const userList = ref([]);
  const isAuthenticated = computed(() => !!currentUser.value);

  const login = async credentials => {
    // 登录逻辑
  };

  const logout = () => {
    // 登出逻辑
  };

  return {
    currentUser,
    userList,
    isAuthenticated,
    login,
    logout
  };
});
```

## CSS/SCSS 命名

### BEM 方法论

BEM 的意思就是块（block）、元素（element）、修饰符（modifier），是由 Yandex 团队提出的一种前端命名方法论。这种巧妙的命名方法让你的 CSS 类对其他开发者来说更加透明而且更有意义。BEM 命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

---

`Element Plus`, `Ant Design Vue` 等组件库的 CSS 命名规则皆遵循 BEM 方法论。

::: tip 提示
推荐使用 BEM 命名，非必须使用，具体问题具体分析
:::

#### Block（块）

页面上的独立组件。

例如：header、menu、button。

命名示例：

```css
.button {
  ...;
}
.menu {
  ...;
}
```

#### Element（元素）

Block 的子元素，是 Block 的一部分，不能脱离 Block 使用。

用 \_\_ 连接 Block 和 Element。

示例：

```css
.menu__item {
  ...;
}
.button__icon {
  ...;
}
```

#### Modifier（修饰符）

用于描述 Block 或 Element 的状态或风格变化。

用 -- 连接 Block/Element 与 Modifier。

示例：

```css
.button--primary {
  ...;
} /* 主按钮 */
.button__icon--large {
  ...;
} /* 大图标 */
```

#### 命名规则总结

| 类型     | 连接符 | 示例               | 说明                       |
| -------- | ------ | ------------------ | -------------------------- |
| Block    | -      | `.button`          | 独立组件                   |
| Element  | `__`   | `.button__icon`    | Block 内部元素             |
| Modifier | `--`   | `.button--primary` | Block 或 Element 状态/变体 |

### `CSS Module`

#### 文件命名约定

在 Vue 中使用 CSS Modules 时，CSS 文件必须以 .module.css 或 .module.scss 等后缀命名：

这样 Vue / Vite 才会识别这是一个 CSS Module 文件。

#### 基本使用方式

index.module.css

```css
.button {
  background-color: #42b983;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}
```

index.vue

```vue
<template>
  <button :class="styles.button">点击我</button>
</template>

<script setup lang="ts">
import styles from './Button.module.css';
</script>
```

#### 说明：

- styles.button 会被编译成一个唯一的类名，保证局部作用域。
- Vue `<script setup>` 下直接 import 即可使用。

#### 与 `<style module>` 的另一种写法

在 Vue 单文件组件里，你也可以直接在 `<style>` 标签上声明 module，不需要单独文件：

```vue
<template>
  <button :class="$style.button">点击我</button>
</template>

<script setup lang="ts">
// 不需要 import，直接使用 $style
</script>

<style module>
.button {
  background-color: #42b983;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>
```

#### 说明：

- `$style` 是 Vue 内置的 Module 对象，自动映射类名。
- 对团队来说，这种方式适合组件内部样式不需要复用的情况。

## 文件和目录命名

### 项目结构命名

````

src/
├── components/ # 组件目录
│ ├── common/ # 通用组件
│ │ ├── Button/
│ │ ├── Modal/
│ │ └── LoadingSpinner/
│ └── feature/ # 功能特定组件
│ ├── UserProfile/
│ ├── OrderList/
│ └── PaymentForm/
├── pages/ # 页面组件
│ ├── HomePage/
│ ├── UserPage/
│ └── OrderPage/
├── hooks/ # 自定义 Hook
│ ├── useAuth.js
│ ├── useLocalStorage.js
│ └── useApiData.js
├── utils/ # 工具函数
│ ├── formatters.js
│ ├── validators.js
│ └── helpers.js
├── stores/ # 状态管理
│ ├── userStore.js
│ ├── orderStore.js
│ └── index.js
└── styles/ # 样式文件
├── globals.css
├── variables.css
└── components.css

```

```
````
