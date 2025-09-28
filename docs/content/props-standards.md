# Props 定义规范

## 概述

Props 是组件之间数据传递的主要方式，良好的 Props 设计直接影响组件的可用性、可维护性和类型安全性。本规范定义了 Props 的命名、类型定义、默认值设置、验证等标准，旨在提高组件接口的一致性 and 可预测性。

## 基本原则

### 核心理念

1. **类型安全**: 所有 Props 都应该有明确的类型定义
2. **语义清晰**: Props 名称应该准确表达其用途和含义
3. **向后兼容**: Props 的变更应该保持向后兼容性
4. **最小化接口**: 只暴露必要的 Props，避免过度配置
5. **一致性**: 同类型的 Props 在不同组件中应该保持一致的命名和行为

## TypeScript Props 定义规范

### 1. 基础 Props 定义

```typescript
/**
 * 用户信息组件 Props 定义
 */
interface UserProfileProps {
  /** 用户唯一标识符 - 必需属性 */
  userId: string;

  /**
   * 用户显示名称
   * @default 从用户数据中获取
   */
  displayName?: string;

  /**
   * 头像尺寸
   * @default 'medium'
   */
  avatarSize?: 'small' | 'medium' | 'large';

  /**
   * 是否显示在线状态
   * @default false
   */
  showOnlineStatus?: boolean;

  /**
   * 最大显示字符数
   * 超出部分将显示省略号
   * @default 50
   */
  maxNameLength?: number;

  /**
   * 自定义样式类名
   * @default ''
   */
  className?: string;

  /**
   * 内联样式对象
   */
  style?: Record<string, string | number>;
}

// ✅ 使用接口定义 Props
const props = withDefaults(defineProps<UserProfileProps>(), {
  avatarSize: 'medium',
  showOnlineStatus: false,
  maxNameLength: 50,
  className: '',
  style: () => ({})
});
```

### 2. 复杂类型 Props

```typescript
/**
 * 数据表格列配置
 */
interface TableColumn {
  /** 列唯一标识 */
  key: string;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: number | string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 自定义渲染函数 */
  render?: (value: any, record: any, index: number) => string | VNode;
}

/**
 * 分页配置
 */
interface PaginationConfig {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否显示页码选择器 */
  showSizeChanger?: boolean;
  /** 每页显示条数选项 */
  pageSizeOptions?: number[];
}

/**
 * 表格组件 Props
 */
interface DataTableProps {
  /** 表格数据 */
  data: Record<string, any>[];

  /** 列配置 */
  columns: TableColumn[];

  /**
   * 行唯一标识字段名
   * @default 'id'
   */
  rowKey?: string;

  /**
   * 表格大小
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 是否显示边框
   * @default false
   */
  bordered?: boolean;

  /**
   * 是否显示斑马纹
   * @default false
   */
  striped?: boolean;

  /**
   * 加载状态
   * @default false
   */
  loading?: boolean;

  /**
   * 空数据时的显示内容
   * @default '暂无数据'
   */
  emptyText?: string;

  /** 分页配置，传入 false 则不显示分页 */
  pagination?: PaginationConfig | false;

  /**
   * 是否支持行选择
   * @default false
   */
  selectable?: boolean;

  /**
   * 选择类型
   * @default 'checkbox'
   */
  selectionType?: 'checkbox' | 'radio';

  /** 已选中的行 key 数组 */
  selectedRowKeys?: string[];

  /**
   * 表格滚动配置
   */
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
}

const props = withDefaults(defineProps<DataTableProps>(), {
  rowKey: 'id',
  size: 'medium',
  bordered: false,
  striped: false,
  loading: false,
  emptyText: '暂无数据',
  pagination: () => ({
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: false,
    showSizeChanger: false,
    pageSizeOptions: [10, 20, 50, 100]
  }),
  selectable: false,
  selectionType: 'checkbox',
  selectedRowKeys: () => []
});
```

## Props 命名规范

### 1. 命名约定

```typescript
// ✅ 正确的 Props 命名

interface ComponentProps {
  // 布尔类型 - 使用 is/has/can/should/enable 前缀
  isVisible: boolean;
  hasError: boolean;
  canEdit: boolean;
  shouldAutoFocus: boolean;
  enableAnimation: boolean;

  // 事件处理函数 - 使用 on 前缀
  onClick: (event: MouseEvent) => void;
  onSubmit: (data: FormData) => void;
  onValueChange: (value: string) => void;

  // 数量/尺寸 - 使用描述性名词
  maxLength: number;
  minHeight: number;
  itemCount: number;
  columnWidth: string | number;

  // 状态/模式 - 使用枚举或联合类型
  status: 'loading' | 'success' | 'error' | 'idle';
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';

  // 配置对象 - 使用 Config/Options 后缀
  validationConfig: ValidationConfig;
  paginationOptions: PaginationOptions;

  // 数据集合 - 使用复数形式
  items: Item[];
  users: User[];
  categories: Category[];

  // 单个实体 - 使用单数形式
  currentUser: User;
  selectedItem: Item;
  activeTab: Tab;
}

// ❌ 错误的 Props 命名
interface BadComponentProps {
  visible: boolean; // 应该是 isVisible
  error: boolean; // 应该是 hasError
  click: () => void; // 应该是 onClick
  max: number; // 不够描述性，应该是 maxLength 等
  data: any[]; // 太泛化，应该使用具体名称
  config: any; // 太泛化，应该是具体的配置类型
}
```

### 2. Props 分组和组织

```typescript
/**
 * 复杂组件的 Props 分组示例
 */
interface DataTableProps {
  // === 数据相关 ===
  /** 表格数据 */
  data: TableRow[];
  /** 数据加载状态 */
  loading?: boolean;
  /** 错误信息 */
  error?: string | null;

  // === 显示配置 ===
  /** 列配置 */
  columns: TableColumn[];
  /** 表格尺寸 */
  size?: TableSize;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示斑马纹 */
  striped?: boolean;
  /** 空数据提示 */
  emptyText?: string;

  // === 交互功能 ===
  /** 是否可选择行 */
  selectable?: boolean;
  /** 选择类型 */
  selectionType?: 'single' | 'multiple';
  /** 已选中的行键 */
  selectedRowKeys?: string[];
  /** 是否可排序 */
  sortable?: boolean;
  /** 当前排序 */
  sortBy?: string;
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc';

  // === 分页配置 ===
  /** 分页配置 */
  pagination?: PaginationConfig | false;

  // === 样式定制 ===
  /** 自定义类名 */
  className?: string;
  /** 内联样式 */
  style?: CSSProperties;
  /** 主题配置 */
  theme?: TableTheme;

  // === 事件处理 ===
  /** 行点击事件 */
  onRowClick?: (row: TableRow, index: number) => void;
  /** 选择变化事件 */
  onSelectionChange?: (selectedRows: TableRow[]) => void;
  /** 排序变化事件 */
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  /** 分页变化事件 */
  onPageChange?: (page: number, pageSize: number) => void;
}
```

## Props 默认值处理

### 1. 简单默认值

```typescript
/**
 * 简单类型默认值
 */
interface SimpleProps {
  title?: string;
  count?: number;
  visible?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<SimpleProps>(), {
  title: '默认标题',
  count: 0,
  visible: false,
  size: 'medium'
});

const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
});
```

### 2. 复杂默认值

```typescript
/**
 * 复杂类型默认值
 */
interface ComplexProps {
  user?: User | null;
  options?: ConfigOptions;
  items?: Item[];
  handlers?: EventHandlers;
  styles?: CSSProperties;
}

const props = withDefaults(defineProps<ComplexProps>(), {
  user: null,
  // 使用工厂函数避免引用共享
  options: () => ({
    autoSave: true,
    timeout: 5000,
    retryCount: 3
  }),
  items: () => [],
  handlers: () => ({
    onSave: () => {},
    onCancel: () => {},
    onError: (error: Error) => console.error(error)
  }),
  styles: () => ({
    padding: '16px',
    borderRadius: '4px',
    backgroundColor: '#ffffff'
  })
});
```

## Props 文档和注释规范

### 1. JSDoc 注释

````typescript
/**
 * 用户列表组件 Props
 * 用于展示和管理用户数据的组件属性定义
 */
interface UserListProps {
  /**
   * 用户数据列表
   * @description 包含用户基本信息的数组
   * @example
   * [
   *   { id: '1', name: '张三', email: 'zhang@example.com' },
   *   { id: '2', name: '李四', email: 'li@example.com' }
   * ]
   */
  users: User[];

  /**
   * 加载状态
   * @description 当为 true 时显示加载动画
   * @default false
   */
  loading?: boolean;

  /**
   * 每页显示数量
   * @description 用于分页显示的每页条目数
   * @default 20
   * @minimum 1
   * @maximum 100
   */
  pageSize?: number;

  /**
   * 排序字段
   * @description 指定用于排序的字段名
   * @default 'createdAt'
   * @see {@link User} 用户对象结构
   */
  sortBy?: keyof User;

  /**
   * 排序方向
   * @description 升序或降序排列
   * @default 'desc'
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * 用户点击事件处理函数
   * @description 当用户点击列表项时触发
   * @param user 被点击的用户对象
   * @param index 用户在列表中的索引
   * @example
   * ```typescript
   * const handleUserClick = (user: User, index: number) => {
   *   console.log(`Clicked user: ${user.name} at index ${index}`)
   *   router.push(`/user/${user.id}`)
   * }
   * ```
   */
  onUserClick?: (user: User, index: number) => void;

  /**
   * 自定义渲染函数
   * @description 允许自定义用户项的渲染方式
   * @param user 用户对象
   * @param index 索引
   * @returns 渲染的 VNode
   * @since v2.1.0
   * @deprecated 请使用插槽 `user-item` 代替
   */
  renderUser?: (user: User, index: number) => VNode;
}
````

## 为什么使用 withDefaults

`withDefaults` 是一个用于处理 Props 默认值的工具函数，它可以将默认值与 Props 进行合并，并返回一个新的 Props 对象。

推荐用 `withDefaults(defineProps<T>())` 而不是传统的 Options API 风格对象写法

### 传统写法

```js
const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
});
```

- 类型推导不完整,`TypeScript` 对这种写法的类型推导有限。
- 如果你的 props 接口很复杂（有联合类型、对象类型、函数类型），用对象写法很麻烦。
- withDefaults 可以直接配合 defineProps< T >()
- 对象或函数类型的默认值，必须写成返回函数

### **withDefaults** 的优势

| 特性             | 传统对象写法                    | `withDefaults` + TS                  |
| ---------------- | ------------------------------- | ------------------------------------ |
| 类型推导         | 弱或需要手动声明                | 完全类型推导                         |
| 默认值写法       | 原始类型可以，函数/对象需用函数 | 原始、对象、函数都支持               |
| 组合式函数兼容性 | 不是天然支持                    | 天然支持 `<script setup>` 组合式 API |
| 可维护性         | 多个 props 对象嵌套复杂         | 与接口或类型绑定，更易维护和重构     |
