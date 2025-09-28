# 注释规范

## 概述

良好的注释是代码可维护性的重要保障。本规范定义了项目中注释的编写标准，旨在提高代码的可读性、可维护性和团队协作效率。

## 注释原则

### 核心理念

1. **解释为什么，而非是什么**: 注释应该解释代码的意图和原因，而不是重复代码的功能
2. **保持同步**: 注释必须与代码保持同步，过时的注释比没有注释更糟糕
3. **简洁明了**: 用最少的文字传达最重要的信息
4. **面向读者**: 考虑代码的使用者和维护者，而不仅仅是编写者

### 什么时候写注释

```javascript
// ✅ 需要注释的情况

// 1. 复杂的业务逻辑
/**
 * 计算用户积分等级
 * 根据累计消费金额和活跃度综合评定
 * 算法参考: 产品需求文档 v2.3 第5.2节
 */
const calculateUserLevel = user => {
  const baseScore = user.totalSpending * 0.1;
  const activityBonus = user.activeDays > 30 ? 50 : 0;
  return Math.floor((baseScore + activityBonus) / 100);
};

// 2. 非直观的技术实现
/**
 * 使用防抖避免频繁的API调用
 * 延迟300ms执行，如果在此期间有新的调用则重新计时
 */
const debouncedSearch = debounce(searchUsers, 300);

// 3. 重要的性能考虑
/**
 * 使用 Map 而非 Object 提升大量数据的查找性能
 * 预期处理10万+用户数据
 */
const userCache = new Map();

// 4. 临时解决方案或技术债务
/**
 * TODO: 重构为使用新的认证API
 * 当前使用旧版API，计划在v2.0版本中移除
 * 相关issue: #1234
 */
const legacyAuth = token => {
  // 临时实现...
};
```

### 什么时候不写注释

```javascript
// ❌ 不需要注释的情况

// 1. 显而易见的代码
// 获取用户名称 - 多余的注释
const userName = user.name;

// 2. 好的命名已经说明一切
const validateEmail = email => {
  // 不需要注释 "验证邮箱格式"
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 3. 标准的语言特性
// 遍历数组 - 多余的注释
users.forEach(user => processUser(user));
```

## JSDoc 规范

JSDoc 是一种 JavaScript 文档注释标准，用于给 JavaScript 代码添加结构化的注释，方便生成文档、提升可读性、辅助类型检查和 IDE 智能提示。它类似于 Java 的 Javadoc，但专门为 JavaScript 设计。

> 一份优秀的 JSDoc 注释可以平替 typescript

### 为什么使用 JSDoc 注释

1. 提升代码可读性：JSDoc 注释可以提供函数参数、返回值、类成员、模块信息，这些信息可以作为代码的文档，让代码更易读。
2. 相比于单行注释，JSDoc 在编辑器中的支持更友好，鼠标悬浮时，会显示函数参数、返回值、类成员、模块信息，

### 1. 基本语法

JSDoc 注释通常写在函数、变量、类或模块上方，以 /\*_ ... _/ 包裹：

```js
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
const sum = (a, b) => {
  return a + b;
};
```

### 2. 常用标签

| 标签                   | 用途               |
| ---------------------- | ------------------ |
| `@param`               | 描述函数参数       |
| `@returns` / `@return` | 描述函数返回值     |
| `@typedef`             | 定义自定义类型     |
| `@type`                | 指定变量类型       |
| `@property`            | 描述对象属性       |
| `@example`             | 提供使用示例       |
| `@deprecated`          | 标记废弃方法       |
| `@see`                 | 参考相关链接或方法 |

[查看全部](./jsdoc.md)

解释：

- /\*_ ... _/：JSDoc 注释的标识。
- @param {类型} 名称 - 描述：描述函数参数类型和作用。
- @returns {类型} 描述：描述返回值类型和作用。

### 优点

- 文档自动生成：可以使用工具生成 HTML 文档。
- IDE 智能提示：VSCode、WebStorm 等可以识别 JSDoc，提供类型提示和函数签名。
- 类型检查辅助：配合 TypeScript 或 JSDoc 的类型注解可以在纯 JS 项目里进行静态类型检查。
- 提升可维护性：团队协作时快速了解函数用途、参数类型和返回值。

## TypeScript 特定注释

### 类型注释

在接口返回参数的类型上，我们应尽量为每一个字段添加类型注释。以方便后期维护

```typescript
/**
 * 用户配置接口
 * @interface UserConfig
 */
interface UserConfig {
  /** 用户唯一标识符 */
  readonly id: string;

  /** 用户显示名称 */
  displayName: string;

  /**
   * 用户偏好设置
   * @default {}
   */
  preferences?: {
    /** 主题设置 */
    theme: 'light' | 'dark' | 'auto';

    /**
     * 语言设置
     * @default 'en'
     */
    language: string;

    /**
     * 通知设置
     * @default true
     */
    notifications: boolean;
  };
}

/**
 * API响应的泛型类型
 * @template T 数据类型
 */
type ApiResponse<T> = {
  /** 响应状态码 */
  status: number;

  /** 响应消息 */
  message: string;

  /**
   * 响应数据
   * @nullable
   */
  data: T | null;

  /**
   * 错误信息
   * 仅在请求失败时存在
   */
  error?: {
    code: string;
    details: string;
  };
};
```

### 复杂类型注释

```typescript
/**
 * 事件处理器类型映射
 * 将事件名称映射到对应的处理器函数类型
 *
 * @example
 * type MyEvents = {
 *   'user:login': { userId: string; timestamp: number };
 *   'user:logout': { userId: string };
 * };
 *
 * const handlers: EventHandlers<MyEvents> = {
 *   'user:login': (data) => console.log(`User ${data.userId} logged in`),
 *   'user:logout': (data) => console.log(`User ${data.userId} logged out`)
 * };
 */
type EventHandlers<T extends Record<string, any>> = {
  [K in keyof T]: (data: T[K]) => void | Promise<void>;
};
```

## 行内注释

### 单行注释

```javascript
// ✅ 好的行内注释

const processPayment = (amount, currency) => {
  // 转换为最小货币单位（分）避免浮点数精度问题
  const amountInCents = Math.round(amount * 100);

  // 验证金额范围（最小1分，最大100万元）
  if (amountInCents < 1 || amountInCents > 100000000) {
    throw new Error('Invalid payment amount');
  }

  // 特殊处理：日元没有小数位
  if (currency === 'JPY') {
    return Math.round(amount);
  }

  return amountInCents;
};

// ❌ 不好的行内注释

const processPayment = (amount, currency) => {
  // 乘以100
  const amountInCents = Math.round(amount * 100);

  // 检查金额
  if (amountInCents < 1 || amountInCents > 100000000) {
    throw new Error('Invalid payment amount');
  }

  // 如果是日元
  if (currency === 'JPY') {
    return Math.round(amount); // 返回整数
  }

  return amountInCents; // 返回金额
};
```

### 多行注释

```javascript
/*
 * 复杂算法实现说明
 *
 * 该函数实现了改进的快速排序算法：
 * 1. 使用三路划分优化重复元素处理
 * 2. 小数组使用插入排序提升性能
 * 3. 随机选择枢轴避免最坏情况
 *
 * 时间复杂度：平均 O(n log n)，最坏 O(n²)
 * 空间复杂度：O(log n)
 *
 * 参考文献：
 * - Algorithms 4th Edition, Robert Sedgewick
 * - "Engineering a Sort Function", Jon Bentley
 */
const improvedQuickSort = (arr, left = 0, right = arr.length - 1) => {
  // 实现逻辑...
};
```

### Vue 组件

```vue
<template>
  <!-- 
    用户列表组件
    支持虚拟滚动、搜索过滤、批量操作
  -->
  <div class="user-list">
    <!-- 搜索框 -->
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="搜索用户..." @input="handleSearch" />
    </div>

    <!-- 用户列表 -->
    <virtual-list :items="filteredUsers" :item-height="60" class="user-list-container">
      <template #default="{ item: user }">
        <!-- 用户项组件 -->
        <user-item
          :key="user.id"
          :user="user"
          :selected="selectedUsers.includes(user.id)"
          @select="handleUserSelect"
          @edit="handleUserEdit"
        />
      </template>
    </virtual-list>
  </div>
</template>

<script>
/**
 * 用户列表管理组件
 *
 * @component UserList
 * @example
 * <user-list
 *   :users="userList"
 *   :loading="isLoading"
 *   @selection-change="handleSelectionChange"
 * />
 */
export default {
  name: 'UserList',

  props: {
    /**
     * 用户数据列表
     * @type {Array<Object>}
     */
    users: {
      type: Array,
      required: true,
      default: () => []
    },

    /**
     * 是否显示加载状态
     * @type {boolean}
     * @default false
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * 每页显示数量
     * @type {number}
     * @default 20
     */
    pageSize: {
      type: Number,
      default: 20,
      validator: value => value > 0 && value <= 100
    }
  },

  emits: {
    /**
     * 用户选择状态变化事件
     * @param {Array<string>} selectedIds 选中的用户ID列表
     */
    'selection-change': selectedIds => Array.isArray(selectedIds),

    /**
     * 用户编辑事件
     * @param {Object} user 要编辑的用户对象
     */
    'user-edit': user => user && typeof user.id === 'string'
  },

  data() {
    return {
      /** @type {string} 搜索关键词 */
      searchQuery: '',

      /** @type {Array<string>} 选中的用户ID列表 */
      selectedUsers: [],

      /** @type {number|null} 搜索防抖定时器ID */
      searchTimer: null
    };
  },

  computed: {
    /**
     * 过滤后的用户列表
     * 根据搜索关键词过滤用户
     * @returns {Array<Object>}
     */
    filteredUsers() {
      if (!this.searchQuery.trim()) {
        return this.users;
      }

      const query = this.searchQuery.toLowerCase();
      return this.users.filter(
        user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      );
    }
  },

  methods: {
    /**
     * 处理搜索输入
     * 使用防抖避免频繁触发搜索
     */
    handleSearch() {
      // 清除之前的定时器
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }

      // 设置新的防抖定时器
      this.searchTimer = setTimeout(() => {
        this.$emit('search', this.searchQuery);
      }, 300);
    }
  }
};
</script>
```
