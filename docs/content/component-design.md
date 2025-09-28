# 前端组件设计原则

## 概述

组件化是现代前端开发的核心理念，良好的组件设计能够提高代码的可复用性、可维护性和可测试性。本文档定义了前端组件设计的核心原则和最佳实践，旨在帮助开发团队构建高质量、可扩展的组件系统。

## 设计原则

### 核心理念

1. **单一职责原则**: 每个组件应该只有一个明确的职责和用途
2. **组合优于继承**: 通过组合小的、专注的组件来构建复杂功能
3. **可预测性**: 组件的行为应该是可预测和一致的
4. **可访问性**: 组件应该考虑到所有用户，包括残障用户
5. **性能优先**: 组件设计应该考虑性能影响

## SOLID 原则在组件设计中的应用

### 1. 单一职责原则

```vue
<!-- ❌ 违反单一职责原则 -->
<template>
  <div class="user-dashboard">
    <!-- 用户信息显示 -->
    <div class="user-info">
      <img :src="user.avatar" :alt="user.name" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>

    <!-- 用户统计数据 -->
    <div class="user-stats">
      <div>帖子: {{ posts.length }}</div>
      <div>关注者: {{ followers.length }}</div>
    </div>

    <!-- 用户操作 -->
    <div class="user-actions">
      <button @click="followUser">关注</button>
      <button @click="sendMessage">发消息</button>
    </div>

    <!-- 用户帖子列表 -->
    <div class="user-posts">
      <div v-for="post in posts" :key="post.id">
        {{ post.title }}
      </div>
    </div>
  </div>
</template>
```

```vue
<!-- ✅ 遵循单一职责原则 -->
<template>
  <div class="user-dashboard">
    <!-- 每个组件都有单一职责 -->
    <user-profile :user="user" />
    <user-stats :stats="userStats" />
    <user-actions :user="user" @follow="handleFollow" @message="handleMessage" />
    <user-posts-list :posts="posts" />
  </div>
</template>

<script setup lang="ts">
/**
 * 用户仪表板组件
 * 职责：协调和布局各个子组件
 */

import UserProfile from './components/UserProfile.vue';
import UserStats from './components/UserStats.vue';
import UserActions from './components/UserActions.vue';
import UserPostsList from './components/UserPostsList.vue';

interface Props {
  userId: string;
}

const props = defineProps<Props>();

// 每个组件专注于自己的职责
const { user } = useUserProfile(props.userId);
const { stats: userStats } = useUserStats(props.userId);
const { posts } = useUserPosts(props.userId);

const handleFollow = (user: User) => {
  // 处理关注逻辑
};

const handleMessage = (user: User) => {
  // 处理发消息逻辑
};
</script>
```

### 2. 开闭原则

```vue
<!-- ✅ 通过插槽和属性扩展功能，而不修改组件本身 -->
<template>
  <div class="data-table">
    <!-- 表头插槽，允许自定义 -->
    <div class="table-header">
      <slot name="header" :columns="columns">
        <div v-for="column in columns" :key="column.key" class="th">
          {{ column.title }}
        </div>
      </slot>
    </div>

    <!-- 数据行插槽，允许自定义 -->
    <div class="table-body">
      <div v-for="row in data" :key="getRowKey(row)" class="table-row">
        <slot name="row" :row="row" :columns="columns">
          <div v-for="column in columns" :key="column.key" class="td">
            <slot :name="`column-${column.key}`" :value="row[column.key]" :row="row" :column="column">
              {{ formatCellValue(row[column.key], column) }}
            </slot>
          </div>
        </slot>
      </div>
    </div>

    <!-- 操作区域插槽 -->
    <div v-if="$slots.actions" class="table-actions">
      <slot name="actions" :selected-rows="selectedRows" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 数据表格组件
 * 通过插槽系统支持扩展，无需修改组件源码
 */

interface Column {
  key: string;
  title: string;
  formatter?: (value: any) => string;
  sortable?: boolean;
  filterable?: boolean;
}

interface Props {
  /** 表格数据 */
  data: Record<string, any>[];
  /** 列配置 */
  columns: Column[];
  /** 行唯一标识字段 */
  rowKey?: string;
  /** 是否支持多选 */
  selectable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  selectable: false
});

const selectedRows = ref<any[]>([]);

const getRowKey = (row: any): string => {
  return row[props.rowKey] || Math.random().toString();
};

const formatCellValue = (value: any, column: Column): string => {
  return column.formatter ? column.formatter(value) : String(value);
};
</script>
```

### 3. 接口隔离原则

```typescript
// ❌ 违反接口隔离原则 - 庞大的接口
interface MegaComponentProps {
  // 数据相关
  data: any[];
  loading: boolean;
  error: string | null;

  // 分页相关
  page: number;
  pageSize: number;
  total: number;

  // 排序相关
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  // 过滤相关
  filters: Record<string, any>;

  // 选择相关
  selectable: boolean;
  selectedIds: string[];

  // 编辑相关
  editable: boolean;
  editingId: string | null;

  // 导出相关
  exportable: boolean;
  exportFormat: 'csv' | 'xlsx' | 'pdf';

  // 样式相关
  theme: 'light' | 'dark';
  compact: boolean;
}
```

```typescript
// ✅ 遵循接口隔离原则 - 小而专注的接口
interface DataProps {
  data: any[];
  loading?: boolean;
  error?: string | null;
}

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
}

interface SortingProps {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface FilterProps {
  filters?: Record<string, any>;
}

interface SelectionProps {
  selectable?: boolean;
  selectedIds?: string[];
}

interface EditingProps {
  editable?: boolean;
  editingId?: string | null;
}

// 组件根据需要组合接口
interface UserListProps extends DataProps, PaginationProps, SelectionProps {
  // 用户列表只需要这些功能
}

interface ProductTableProps extends DataProps, SortingProps, FilterProps {
  // 产品表格需要不同的功能组合
}
```

### 5. 依赖倒置原则

```vue
<!-- ❌ 违反依赖倒置 - 直接依赖具体实现 -->
<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUsersFromRestApi } from '@/api/restApi'; // 直接依赖具体实现

const users = ref<User[]>([]);

onMounted(async () => {
  // 直接调用具体的 API 实现
  users.value = await getUsersFromRestApi();
});
</script>
```

```vue
<!-- ✅ 遵循依赖倒置 - 依赖抽象接口 -->
<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 用户列表组件
 * 依赖于抽象的用户数据提供者，而不是具体实现
 */

interface UserDataProvider {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
}

interface Props {
  /** 用户数据提供者 */
  dataProvider: UserDataProvider;
}

const props = defineProps<Props>();
const users = ref<User[]>([]);

onMounted(async () => {
  // 依赖抽象接口，不关心具体实现
  users.value = await props.dataProvider.getUsers();
});
</script>
```
