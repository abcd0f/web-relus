# 组件复用策略标准

## 概述

组件复用是前端开发中提高开发效率、减少代码重复、保持一致性的重要手段。本文档定义了组件复用的策略、分类标准和实施规范，旨在建立统一的组件复用体系。

## 复用策略原则

### 1. 核心理念

- **抽象适度**: 找到合适的抽象层次，既不过度抽象也不过于具体
- **组合优于继承**: 通过组合小组件来构建复杂功能
- **配置驱动**: 通过配置参数控制组件行为，而非硬编码
- **渐进增强**: 支持基础功能到高级功能的渐进式扩展
- **向前兼容**: 新版本保持对旧版本的兼容性

### 2. 复用判断标准

- **功能相似度** ≥ 80%: 适合抽象为通用组件
- **使用频率** ≥ 3 次: 值得创建复用组件
- **维护成本**: 复用带来的维护成本 < 重复开发成本

## 复用设计模式

### 1. 配置驱动模式

```typescript
// 通过配置对象控制组件行为
interface ComponentConfig {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  features: {
    sortable: boolean;
    filterable: boolean;
    exportable: boolean;
  };
}
```

### 2. 插槽扩展模式

```vue
<template>
  <div class="data-table">
    <!-- 头部插槽 -->
    <slot name="header" :data="tableData" />

    <!-- 内容插槽 -->
    <slot name="default" :columns="columns" :rows="rows" />

    <!-- 操作插槽 -->
    <slot name="actions" :selection="selectedRows" />
  </div>
</template>
```

### 3. 渲染函数模式

```typescript
interface RenderConfig {
  cellRenderer?: (value: any, row: any) => VNode;
  headerRenderer?: (column: Column) => VNode;
  emptyRenderer?: () => VNode;
}
```

### 4. 组合式 API 模式

```typescript
// 抽象逻辑为可复用的组合函数
const useTableLogic = (config: TableConfig) => {
  // 返回状态和方法
  return {
    data: readonly(data),
    loading: readonly(loading),
    pagination: readonly(pagination),
    sort,
    filter,
    export: exportData
  };
};
```

### 5. useSlots 和 useAttrs

在 Vue 3 的 `<script setup>` 中，useSlots 和 useAttrs 是获取组件插槽和非 prop 属性（attrs）的低成本方式，它们可以用于构建高复用组件。

#### useSlots

- **用途**: 访问组件插槽，判断是否存在某些插槽内容，或者渲染默认内容。
- **优势**: 不依赖父组件传入 props，增强插槽复用能力。

```ts
import { useSlots } from 'vue';

export const useCustomSlots = () => {
  const slots = useSlots();

  const hasHeader = computed(() => !!slots.header);
  const hasFooter = computed(() => !!slots.footer);

  return {
    slots,
    hasHeader,
    hasFooter
  };
};
```

#### useAttrs

- **用途**: 获取组件未声明的 props（即 attrs），可直接透传到子组件或 DOM 元素。
- **优势**: 实现组件的“属性透传”，无需显式声明每个 prop，增强灵活性和复用性。

```ts
import { useAttrs } from 'vue';

export const useCustomAttrs = () => {
  const attrs = useAttrs();

  return {
    attrs
  };
};
```

```js
import { useAttrs } from 'vue';

export const useCustomAttrs = () => {
  const attrs = useAttrs();

  return {
    attrs
  };
};
```
