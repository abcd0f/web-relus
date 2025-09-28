# 导入导出规范

## 概述

在 ES6 中，模块是一个独立的文件，文件中的代码默认运行在模块作用域中，而不是全局作用域。模块通过 `export` 向外暴露内容，通过 `import` 引入其他模块的内容。模块化的核心优势包括：

- **代码组织**：将功能拆分成小块，便于管理和维护。
- **作用域隔离**：避免全局变量污染。
- **依赖管理**：明确模块之间的依赖关系。

## 模块导入规范

### 导入顺序

模块导入应按照以下顺序排列，组间使用空行分隔：

1. **外部库模块**（如 vue、axios 等）
2. **项目内部绝对路径模块**（基于 @ 别名）
3. **相对路径模块**（如 ./ 或 ../）
4. **类型导入**（type 导入）

```typescript
// ✅ 正确的导入顺序
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import { apiClient } from '@/utils/apiClient';
import { themeConfig } from '@/config/theme';

import { Header } from './components/Header';
import { useUser } from '../hooks/useUser';

import type { User } from '@/types/user';
import type { Theme } from '@/types/theme';
```

### 导入别名与解构

```typescript
// ✅ 使用有意义的别名避免命名冲突
import { logger as appLogger } from '@/utils/logger';
import { logger as debugLogger } from '@/utils/debug';

// ✅ 使用解构导入减少重复代码
import { getUser, updateUser, deleteUser } from '@/services/userService';

// ❌ 避免无意义的别名或过度解构
// import { x as Component } from './Component'; // 别名无意义
// import { a, b, c, d, e } from './utils'; // 解构过多，降低可读性
```

## 模块导出规范

### 默认导出

```typescript
// ✅ 每个模块建议仅有一个默认导出
export default defineComponent({
  name: 'MyComponent'
  // ...
});

// ✅ 默认导出类或函数
export default class UserService {
  getUser(id: string) {
    // ...
  }
}

// ❌ 避免多个默认导出或混合导出
// export default function foo() {}
// export default function bar() {} // 多个默认导出
```

### 命名导出

```typescript
// ✅ 使用清晰的命名导出
export const BASE_URL = '/api';
export const fetchData = async (url: string) => {
  // ...
};
export const parseResponse = (data: unknown) => {
  // ...
};

// ✅ 导出类型
export type { User, Role } from './types/user';

// ✅ 统一导出
export { useAuth, usePermission } from './hooks/auth';

// ❌ 避免模糊或不一致的命名
// export const x = 1; // 命名不明确
// export { default as foo } from './module'; // 避免间接导出
```

### 导出组织

```typescript
// ✅ 将所有导出集中放置在文件底部
import { ref } from 'vue';
import type { User } from '@/types/user';

const user = ref<User | null>(null);

const setUser = (newUser: User) => {
  user.value = newUser;
};

const clearUser = () => {
  user.value = null;
};

export { user, setUser, clearUser };

// ✅ 按功能分组导出
export const userUtils = {
  setUser,
  clearUser
};

export const userConstants = {
  MAX_NAME_LENGTH: 50,
  MIN_AGE: 18
};
```

### 重新导出

```typescript
// ✅ 使用重新导出来组织模块
export * from './types/user';
export * from './utils/string';
export { useAuth, usePermission } from './hooks/auth';

// ✅ 有选择地重新导出
export { fetchData as fetchApiData } from './api/fetch';
export { parseResponse } from './api/parse';

// ❌ 避免过度重新导出导致模块耦合
// export * from './all'; // 不明确且可能包含未使用的导出
```

## 动态导入

```typescript
// ✅ 使用动态导入优化性能
const loadComponent = async () => {
  const { MyComponent } = await import('./components/MyComponent');
  return MyComponent;
};

// ✅ 配合 Vite 的按需加载
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue')
  }
];

// ✅ 动态导入类型
const loadTypes = async () => {
  const { User } = await import('./types/user');
  return User;
};

// ❌ 避免不必要的动态导入
// const { StaticComponent } = await import('./StaticComponent'); // 非必要动态加载
```

## 导入导出优化

### 避免循环依赖

```typescript
// ✅ 分离模块以避免循环依赖
// user.ts
export type User = {
  id: string;
  name: string;
};

// userService.ts
import type { User } from './user';
export const getUser = (id: string): User => {
  // ...
};

// ❌ 循环依赖示例
// moduleA.ts
// import { fnB } from './moduleB';
// export const fnA = () => fnB();

// moduleB.ts
// import { fnA } from './moduleA';
// export const fnB = () => fnA();
```

### 按需导入

```typescript
// ✅ 按需导入以减少打包体积
import { debounce } from 'lodash-es';
import { ref } from 'vue';

// ❌ 避免导入整个库
// import * as lodash from 'lodash-es'; // 导入整个库
```

### 统一入口文件

```typescript
// ✅ 使用 index.ts 作为模块入口
// src/utils/index.ts
export * from './string';
export * from './array';
export { formatDate } from './date';

// ✅ 使用 barrel 文件组织导出
// src/components/index.ts
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Sidebar } from './Sidebar';
```

```typescript
// 示例：完整模块示例
import { ref } from 'vue';
import { apiClient } from '@/utils/apiClient';
import type { User } from '@/types/user';

const user = ref<User | null>(null);

export const fetchUser = async (id: string): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  user.value = response.data;
  return response.data;
};

export const clearUser = () => {
  user.value = null;
};

export { user };
export type { User };
```
