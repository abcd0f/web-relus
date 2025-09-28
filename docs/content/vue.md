# Vue3 组合式 API 规范

## 概述

Vue3 的 Composition API 配合 `<script setup>` 语法糖提供了更简洁、更灵活的组件编写方式。本规范定义了项目中使用 setup 语法糖的标准写法，旨在提高代码的一致性、可读性和维护性。

## 基本原则

### 核心理念

1. **选项式思维顺序优先**: 按照选项式 API 的方式分散，而不是相关逻辑代码应该组织在一起
2. **类型安全**: 充分利用 TypeScript 的类型系统，确保代码的类型安全
3. **可复用性**: 抽取可复用的逻辑到组合式函数(Composables)中
4. **渐进式增强**: 优先使用 Vue3 的新特性，保持向后兼容

## 基础语法规范

### 1. 基本结构

```vue
<template>
  <div class="user-profile">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <button @click="handleRefresh" :disabled="loading">{{ loading ? '加载中...' : '刷新' }}</button>
  </div>
</template>

<script setup lang="ts">
/**
 * 用户配置页面组件
 *
 * @component UserProfile
 * @description 展示和管理用户基本信息
 */

// 1. 导入依赖
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { fetchUserProfile } from '@/api/user';
import type { User } from '@/types/user';

// 2. 定义接口
interface Props {
  /** 用户ID */
  userId: string;
  /** 是否显示详细信息 */
  showDetails?: boolean;
}

interface Emits {
  /** 用户信息更新事件 */
  (e: 'update', user: User): void;
  /** 刷新完成事件 */
  (e: 'refresh-complete'): void;
}

// 组件元信息（名字、继承、slots 等）
defineOptions({ name: 'UserCard' });

// v-model 相关
const modelValue = defineModel<string>();

// Props
const props = withDefaults(defineProps<Props>(), {
  showDetails: false
});

// Emits
const emit = defineEmits<Emits>();

// 📌 为什么这样排？
// 先全局，再局部
// defineOptions 是组件的元信息，放最前面最直观。
// v-model 优先
// 因为它本质上就是 props + emits 的语法糖，放在 props/emits 前面符合逻辑。
// props 和 emits 紧挨着
// 这样阅读时能一眼看到“组件输入输出”。
// 最后才是逻辑代码
// 响应式变量、方法、生命周期钩子都排在定义区之后。

// 4. 组合式函数和外部依赖
const router = useRouter();
const userStore = useUserStore();

// 5. 响应式数据
const loading = ref(false);
const user = ref<User | null>(null);
const error = ref<string | null>(null);

// 6. 计算属性
const displayName = computed(() => {
  return user.value?.nickname || user.value?.name || '未知用户';
});

// 7. 监听器
watch(
  () => props.userId,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await fetchUser(newId);
    }
  },
  { immediate: true }
);

// 8. 方法定义
/**
 * 获取用户信息
 * @param id 用户ID
 */
async function fetchUser(id: string) {
  try {
    loading.value = true;
    error.value = null;
    const userData = await fetchUserProfile(id);
    user.value = userData;
    emit('update', userData);
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取用户信息失败';
    console.error('Failed to fetch user:', err);
  } finally {
    loading.value = false;
  }
}

/**
 * 刷新用户信息
 */
async function handleRefresh() {
  await fetchUser(props.userId);
  emit('refresh-complete');
}

// 9. 生命周期钩子
onMounted(() => {
  console.log('UserProfile component mounted');
});

// 10. 向父组件暴露方法（可选）
defineExpose({
  refreshUser: handleRefresh
});
</script>

<style scoped>
.user-profile {
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 2. 代码组织顺序

::: tip

在 Vue 3 里使用 组合式 API 时，代码组织顺序是团队规范里非常重要的一环，它直接影响可维护性和可读性。常见的实践大致分为以下两种方式

---

两种方式各有优缺点，但更推荐`选项式思维顺序（按类别组织）`,在`逻辑分组（按功能组织）`中一个 `ref` 对应的往往不是一个函数，而是一个对象。

例如有 A,B,C 三个函数，内部都有用到同一个`ref`,那么这个变量应该写在哪一个函数中？

如果一个变量仅在一个函数中有使用，那么为什么不放在函数内部，或者抽离出组合式函数（hooks）

`逻辑分组（按功能组织）`编写起来更自由，但是也足够碎片化，容易产生代码碎片。
:::

::: code-group

```vue [选项式思维顺序（按类别组织）]
<script setup lang="ts">
// 1. 导入语句
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useComposable } from '@/composables/useComposable';

// 2. 类型定义
interface Props {
  // ...
}

// 3. Props 和 Emits
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 4. 组合式函数
const router = useRouter();
const { data, loading } = useComposable();

// 5. 响应式状态
const count = ref(0);
const message = ref('');

// 6. 计算属性
const doubleCount = computed(() => count.value * 2);

// 7. 监听器
watch(count, newVal => {
  console.log('Count changed:', newVal);
});

// 8. 方法定义
const increment = () => {
  count.value++;
};

// 9. 生命周期钩子
onMounted(() => {
  // 初始化逻辑
});

// 10. defineExpose（如果需要）
defineExpose({
  increment
});
</script>
```

```vue [逻辑分组（按功能组织）]
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// ✅ 用户逻辑
const user = ref<{ name: string; age: number }>({ name: '张三', age: 20 });
const userAgeLabel = computed(() => `${user.value.age}岁`);
const updateUserAge = () => {
  user.value.age++;
};

// ✅ 列表逻辑
const list = ref<string[]>([]);
const addItem = (item: string) => {
  list.value.push(item);
};

// ✅ 生命周期逻辑
onMounted(() => {
  console.log('组件挂载');
});
</script>
```

:::

## 组合式函数使用(Hooks)

[文档直达](https://cn.vuejs.org/guide/reusability/composables.html#what-is-a-composable)

在 Vue3 的项目中强烈推荐使用 hooks 进行功能的拆分和复用，这是 Vue 官方团队推荐的编写方式，下面来看一个列子，比如说，我要实现一个弹框的功能，下面常见的写法，第一种偏后端思维的写法：

```js
const editModel = reactive({
  isShow: false,
  form: {
    name: 'ANDROID'
    // ......
  },
  showFunc: () => {
    // 显示逻辑
  },
  cancelFunc: () => {
    // 取消逻辑
  },
  submitFunc: () => {
    // 提交逻辑
  }
});
```

或者其他的类似写法，不在赘述。 其实都可以换成 hooks 的写法：

示例：

```js
const useEditModel = () => {
  const isShow = ref(false);

  /**
   * 显示弹框
   */
  const showModal = () => {};

  /**
   * 关闭弹框
   */
  const cancelModal = () => {};

  /**
   * 提交操作
   */
  const submitModal = () => {};

  onBeforeMount(() => {
    // TODO
  });

  return {
    isShow,
    showModal,
    cancelModal,
    submitModal
  };
};

// 其他地方使用
const { isShow, showModal, cancelModal, submitModal } = useEditModel();
```

### 1. 创建组合式函数

```js
/**
 * 用户管理组合式函数
 * 提供用户数据的增删改查功能
 *
 * @param options 配置选项
 * @returns 用户管理相关的状态和方法
 */
export function useUserManagement(options: {
  /** 是否自动加载数据 */
  autoFetch?: boolean
  /** 分页大小 */
  pageSize?: number
} = {}) {
  const { autoFetch = true, pageSize = 20 } = options

  // 状态管理
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = reactive({
    page: 1,
    pageSize,
    total: 0
  })

  // 获取用户列表
  async function fetchUsers() {
    try {
      loading.value = true
      error.value = null

      const response = await getUserList({
        page: pagination.page,
        pageSize: pagination.pageSize
      })

      users.value = response.data
      pagination.total = response.total
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取用户列表失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 添加用户
  async function addUser(userData: CreateUserData) {
    try {
      const newUser = await createUser(userData)
      users.value.unshift(newUser)
      return newUser
    } catch (err) {
      error.value = '添加用户失败'
      throw err
    }
  }

  // 删除用户
  async function deleteUser(userId: string) {
    try {
      await removeUser(userId)
      const index = users.value.findIndex(u => u.id === userId)
      if (index > -1) {
        users.value.splice(index, 1)
      }
    } catch (err) {
      error.value = '删除用户失败'
      throw err
    }
  }

  // 计算属性
  const activeUsers = computed(() =>
    users.value.filter(user => user.status === 'active')
  )

  const hasUsers = computed(() => users.value.length > 0)

  // 自动加载
  if (autoFetch) {
    onMounted(() => {
      fetchUsers()
    })
  }

  return {
    // 状态
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),

    // 计算属性
    activeUsers,
    hasUsers,

    // 方法
    fetchUsers,
    addUser,
    deleteUser,

    // 分页方法
    nextPage: () => {
      if (pagination.page * pagination.pageSize < pagination.total) {
        pagination.page++
        fetchUsers()
      }
    },
    prevPage: () => {
      if (pagination.page > 1) {
        pagination.page--
        fetchUsers()
      }
    }
  }
}
```

### 2. 使用组合式函数

```vue
<script setup lang="ts">
import { useUserManagement } from '@/composables/useUserManagement';
import { useConfirmDialog } from '@/composables/useConfirmDialog';

// 使用组合式函数
const { users, loading, error, activeUsers, fetchUsers, addUser, deleteUser, nextPage, prevPage } = useUserManagement({
  autoFetch: true,
  pageSize: 10
});

const { showConfirm } = useConfirmDialog();

// 处理删除用户
async function handleDeleteUser(user: User) {
  const confirmed = await showConfirm({
    title: '确认删除',
    message: `确定要删除用户 "${user.name}" 吗？此操作不可恢复。`
  });

  if (confirmed) {
    try {
      await deleteUser(user.id);
      // 可以添加成功提示
    } catch (err) {
      // 错误处理已在组合式函数中完成
    }
  }
}
</script>
```

## Props 和 Emits 规范

### 1. Props 定义

```vue
<script setup lang="ts">
// ✅ 推荐：使用 TypeScript 接口
interface Props {
  /** 用户ID，必需参数 */
  userId: string;

  /**
   * 显示模式
   * @default 'list'
   */
  mode?: 'list' | 'grid' | 'card';

  /**
   * 是否显示操作按钮
   * @default true
   */
  showActions?: boolean;

  /**
   * 最大显示数量
   * 设置为 0 表示不限制
   * @default 10
   */
  maxCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'list',
  showActions: true,
  maxCount: 10
});

// ❌ 不推荐：运行时声明方式（在 TypeScript 项目中）
const props = defineProps({
  userId: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: 'list'
  }
});
</script>
```

### 2. Emits 定义

```vue
<script setup lang="ts">
// ✅ 推荐：类型化 Emits
interface Emits {
  /**
   * 项目选择事件
   * @param item 选中的项目
   */
  (e: 'select', item: Item): void;

  /**
   * 数据更新事件
   * @param data 更新后的数据
   * @param type 更新类型
   */
  (e: 'update', data: any[], type: 'add' | 'remove' | 'modify'): void;

  /**
   * 错误事件
   * @param error 错误信息
   */
  (e: 'error', error: Error): void;
}

const emit = defineEmits<Emits>();

// 使用示例
const handleItemClick = (item: Item) => {
  emit('select', item);
};

const handleError = (err: Error) => {
  emit('error', err);
};
</script>
```

## 响应式数据规范

### 1. ref vs reactive

```vue
<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';

// ✅ 使用 ref 处理基础类型
const count = ref(0);
const message = ref('');
const loading = ref(false);
const items = ref<Item[]>([]);

// ✅ 使用 reactive 处理复杂对象（保持结构稳定）
const form = reactive({
  name: '',
  email: '',
  age: 0,
  preferences: {
    theme: 'light' as const,
    notifications: true
  }
});

// ✅ 使用 toRefs 解构 reactive 对象
const { name, email } = toRefs(form);

// ❌ 避免混用导致的类型复杂性
const mixedState = reactive({
  count: ref(0), // 避免在 reactive 中嵌套 ref
  items: []
});
</script>
```

### 2. 数据初始化

```vue
<script setup lang="ts">
// ✅ 明确的类型定义和默认值
const userList = ref<User[]>([]);
const currentUser = ref<User | null>(null);
const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
});

// ✅ 复杂状态的工厂函数
function createInitialState() {
  return {
    filters: {
      status: 'active',
      category: '',
      dateRange: []
    },
    sorting: {
      field: 'createdAt',
      direction: 'desc' as const
    },
    selection: new Set<string>()
  };
}

const state = reactive(createInitialState());

// ✅ 重置状态的方法
function resetState() {
  Object.assign(state, createInitialState());
}
</script>
```

## 计算属性和监听器

### 1. 计算属性

```vue
<script setup lang="ts">
// ✅ 简单计算属性
const doubleCount = computed(() => count.value * 2);

// ✅ 复杂计算属性 - 添加注释
/**
 * 过滤和排序后的用户列表
 * 根据搜索关键词、状态过滤，并按创建时间排序
 */
const filteredUsers = computed(() => {
  return users.value
    .filter(user => {
      const matchesSearch = !searchQuery.value || user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus = !statusFilter.value || user.status === statusFilter.value;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
});

// ✅ 计算属性的类型注解
const userStats = computed(
  (): UserStats => ({
    total: users.value.length,
    active: users.value.filter(u => u.status === 'active').length,
    inactive: users.value.filter(u => u.status === 'inactive').length
  })
);

// ❌ 避免在计算属性中进行副作用操作
const badComputed = computed(() => {
  // 不要在计算属性中修改其他状态
  otherState.value = someValue; // ❌
  console.log('Computing...'); // ❌ 避免副作用
  return someValue;
});
</script>
```

### 2. 监听器

```vue
<script setup lang="ts">
// ✅ 基本监听器
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(`Search changed: ${oldQuery} -> ${newQuery}`);
});

// ✅ 监听多个值
watch([searchQuery, statusFilter], ([newQuery, newStatus]) => {
  fetchFilteredData(newQuery, newStatus);
});

// ✅ 深度监听对象
watch(
  () => form,
  newForm => {
    validateForm(newForm);
  },
  { deep: true }
);

// ✅ 立即执行监听器
watch(
  () => props.userId,
  async userId => {
    if (userId) {
      await fetchUserData(userId);
    }
  },
  { immediate: true }
);

// ✅ 监听器的清理
const stopWatcher = watch(someValue, newVal => {
  // 处理逻辑
});

onUnmounted(() => {
  stopWatcher(); // 手动停止监听器
});

// ✅ 异步监听器的正确处理
watch(searchQuery, async newQuery => {
  // 防抖处理
  if (searchTimer.value) {
    clearTimeout(searchTimer.value);
  }

  searchTimer.value = setTimeout(async () => {
    try {
      loading.value = true;
      const results = await searchApi(newQuery);
      searchResults.value = results;
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      loading.value = false;
    }
  }, 300);
});
</script>
```

## 生命周期钩子

[生命周期图示](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, onBeforeMount, onBeforeUnmount } from 'vue';

onBeforeMount(() => {
  console.log('before mount');
});

onMounted(() => {
  console.log('mounted');
});

onBeforeUpdate(() => {
  console.log('before update');
});

onUpdated(() => {
  console.log('updated');
});

onBeforeUnmount(() => {
  console.log('before unmount');
});

onUnmounted(() => {
  console.log('unmounted');
});
</script>
```

## 环境管理

在 vue 项目中，多人开发应保持 node，或其他工具版本一致性

以下为推荐 node、npm 管理工具

- [nvm 全局切换 node 版本的工具](https://github.com/coreybutler/nvm-windows/releases)
- [fnm 根据项目可自动切换 node 版本的工具](https://github.com/Schniz/fnm/releases)
- [nrm 切换 npm 镜像源的工具](https://github.com/Pana/nrm)
