# 语言与语法规范

## 概述

本规范旨在统一团队在前端开发中使用的语言特性和语法风格，确保代码的一致性、可读性和可维护性。

## JavaScript/TypeScript 基础语法规范

### 变量声明

#### 优先级顺序

```javascript
// ✅ 推荐：优先使用 const
const userName = 'john';
const userList = ['alice', 'bob'];

// ✅ 可以：需要重新赋值时使用 let
let count = 0;
count++;

// ❌ 禁止：不使用 var
var oldStyle = 'deprecated';
```

#### 声明时机

```javascript
// ✅ 推荐：声明时初始化
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// ✅ 可以：延迟初始化但要明确意图
let result;
if (condition) {
  result = processData();
} else {
  result = getDefaultData();
}

// ❌ 避免：无意义的预声明
let data; // 没有立即使用
// ... 很多行代码之后
data = fetchData();
```

### 对象和数组操作

#### 解构赋值

```javascript
// ✅ 推荐：对象解构
const {
  name,
  email,
  profile: { age }
} = user;

// ✅ 推荐：数组解构
const [first, second, ...rest] = items;

// ✅ 推荐：函数参数解构
const renderUser = ({ name, avatar, isOnline = false }) => {
  return `<div>${name} ${isOnline ? '🟢' : '⭕'}</div>`;
};
```

#### 展开操作符

```javascript
// ✅ 推荐：对象合并
const defaultConfig = { timeout: 5000, retries: 3 };
const userConfig = { timeout: 10000 };
const finalConfig = { ...defaultConfig, ...userConfig };

// ✅ 推荐：数组操作
const newItems = [...existingItems, newItem];
const itemsCopy = [...originalItems];

// ✅ 推荐：函数参数传递
const apiCall = (endpoint, ...args) => {
  return fetch(endpoint, ...args);
};
```

### 模板字符串

```javascript
// ✅ 推荐：使用模板字符串进行字符串拼接
const message = `Hello ${userName}, you have ${unreadCount} unread messages.`;

// ✅ 推荐：多行字符串
const htmlTemplate = `
  <div class="user-card">
    <h3>${user.name}</h3>
    <p>${user.bio}</p>
  </div>
`;

// ❌ 避免：字符串拼接
const message = 'Hello ' + userName + ', you have ' + unreadCount + ' unread messages.';
```

### 条件语句

#### 简洁的条件表达式

```javascript
// ✅ 推荐：三元运算符用于简单条件
const status = isOnline ? 'online' : 'offline';

// ✅ 推荐：逻辑运算符用于默认值
const displayName = user.nickname || user.name || 'Anonymous';

// ✅ 推荐：可选链操作符
const city = user?.profile?.address?.city;

// ✅ 推荐：空值合并操作符
const timeout = config.timeout ?? 5000; // 只在 null 或 undefined 时使用默认值
```

#### 条件语句最佳实践

```javascript
// ✅ 推荐：提前返回减少嵌套
const processUser = user => {
  if (!user) {
    return null;
  }

  if (!user.isActive) {
    return { ...user, status: 'inactive' };
  }

  return enhanceUserData(user);
};

// ✅ 推荐：使用 switch 处理多个离散值
const getStatusColor = status => {
  switch (status) {
    case 'active':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'inactive':
      return 'red';
    default:
      return 'gray';
  }
};
```

### 循环和迭代

#### 数组方法优于传统循环

```javascript
// ✅ 推荐：使用数组方法
const activeUsers = users.filter(user => user.isActive);
const userNames = users.map(user => user.name);
const totalScore = scores.reduce((sum, score) => sum + score, 0);

// ✅ 推荐：for...of 用于需要索引或复杂逻辑
for (const [index, user] of users.entries()) {
  console.log(`${index}: ${user.name}`);
}

// ❌ 避免：传统 for 循环（除非有特殊性能要求）
for (let i = 0; i < users.length; i++) {
  console.log(users[i].name);
}
```

### 异步编程

#### Promise 和 async/await

```javascript
// ✅ 推荐：使用 async/await
const fetchUserData = async userId => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

// ✅ 推荐：并行处理
const fetchMultipleUsers = async userIds => {
  const promises = userIds.map(id => fetchUserData(id));
  return Promise.all(promises);
};

// ✅ 推荐：错误处理
const safeApiCall = async () => {
  try {
    const data = await riskyApiCall();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

## TypeScript 特定规范

### 类型定义

#### 接口 vs 类型别名

```typescript
// ✅ 推荐：接口用于对象结构定义
interface User {
  readonly id: string;
  name: string;
  email: string;
  profile?: UserProfile;
}

// ✅ 推荐：接口继承
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}

// ✅ 推荐：类型别名用于联合类型、原始类型别名等
type Status = 'pending' | 'approved' | 'rejected';
type ID = string | number;
type EventHandler<T> = (event: T) => void;
```

#### 泛型使用

```typescript
// ✅ 推荐：明确的泛型约束
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

// ✅ 推荐：函数泛型
const createRepository = <T extends { id: string }>(items: T[]): Repository<T> => {
  return {
    findById: (id: string) => items.find(item => item.id === id),
    getAll: () => [...items]
  };
};

// ✅ 推荐：条件类型
type NonNullable<T> = T extends null | undefined ? never : T;
```

#### 类型断言和类型守卫

```typescript
// ✅ 推荐：类型守卫
const isUser = (obj: unknown): obj is User => {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj;
};

// ✅ 推荐：使用 as const 获得更精确的类型
const themes = ['light', 'dark', 'auto'] as const;
type Theme = (typeof themes)[number]; // 'light' | 'dark' | 'auto'

// ✅ 谨慎使用：类型断言
const userInput = formData.get('user') as string;
// 更好的方式是添加运行时检查
if (typeof userInput === 'string') {
  // 安全使用 userInput
}
```

### 严格类型检查

```typescript
// ✅ 推荐：启用严格模式配置
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}

// ✅ 推荐：明确的返回类型
const calculateAge = (birthDate: Date): number => {
  return new Date().getFullYear() - birthDate.getFullYear();
}

// ✅ 推荐：处理可能的 null/undefined
const getUserDisplayName = (user: User | null): string => {
  return user?.name ?? 'Guest User';
}
```

## 现代 ES 特性使用

### 可选链和空值合并

```javascript
// ✅ 推荐：可选链操作符
const userCity = user?.profile?.address?.city;
const onClick = button?.addEventListener?.('click', handler);

// ✅ 推荐：空值合并操作符
const port = process.env.PORT ?? 3000;
const userPrefs = savedPrefs ?? getDefaultPreferences();
```

### 动态导入

```javascript
// ✅ 推荐：按需加载
const loadFeature = async () => {
  const { heavyFeature } = await import('./heavy-feature.js');
  return heavyFeature();
};

// ✅ 推荐：条件导入
if (isDevelopment) {
  const { devTools } = await import('./dev-tools.js');
  devTools.init();
}
```

### 私有字段（类）

```javascript
// ✅ 推荐：使用私有字段
class UserManager {
  #users = new Map();
  #apiKey = process.env.API_KEY;

  addUser(user) {
    this.#users.set(user.id, user);
  }

  #validateUser(user) {
    return user.name && user.email;
  }
}
```

## 代码风格一致性

### 分号使用

```javascript
// ✅ 推荐：始终使用分号
const message = 'Hello World';
const users = [];

const getName = () => {
  return 'John';
};
```

### 引号使用

```javascript
// ✅ 推荐：优先使用单引号
const singleQuoted = 'This is preferred';

// ✅ 可以：包含单引号时使用双引号
const withApostrophe = "Don't worry about it";

// ✅ 推荐：模板字符串用于插值
const greeting = `Hello ${name}`;
```

### 尾随逗号

```javascript
// ✅ 推荐：对象和数组使用尾随逗号
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3 // 尾随逗号便于版本控制
};

const items = [
  'apple',
  'banana',
  'orange' // 尾随逗号
];
```

## 工具配置

### ESLint 规则建议

```javascript
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', '@typescript-eslint/recommended'],
  rules: {
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
};
```

### Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## 总结

遵循这些语言和语法规范将帮助团队：

- **提高代码一致性**：统一的语法风格让代码更容易阅读和理解
- **减少错误**：使用现代语法特性和最佳实践减少常见错误
- **提升开发效率**：一致的代码风格减少了代码审查和维护时间
- **增强可维护性**：清晰的语法结构使代码更容易修改和扩展

建议团队定期审查和更新这些规范，以适应新的语言特性和最佳实践的发展。
