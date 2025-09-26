---
title: 函数
---

# 函数

## 1.1、箭头函数

推荐使用箭头函数(保持 this 指向不变，避免后期定位问题的发杂度)。

示例：

```js{1,5}
// ✅ 【建议】业务开发中提倡的做法, 箭头函数配合const函数一起使用

const getTableListData = () => { // TODO }

//【反例】尽量不要出现混用，如下：

function getDomeData () {}
const getDome1Data = () => {}



// ❌ 避免：匿名函数赋值
const getUserData = function(id: string) { /* ... */ };

```

> [!NOTE] 为什么推荐箭头函数
> this 指向稳定，不受调用环境影响。
> 语法简洁，提高可读性。
> 配合 const 使用可避免重复声明。

## 1.2 命名规范

- 函数命名应表达函数功能，动词开头，如 getUserInfo、setUserData。
- 避免使用模糊命名如 doSomething、handleData1。
- 异步函数建议使用 async 前缀或以 Async 后缀命名，如 fetchUserAsync。

## 1.3 参数与默认值

- 参数应尽量简洁、明确。
- 可使用对象参数解构，增强可读性和可扩展性。
- 必要时提供默认值，避免 undefined 导致逻辑错误。

```js
const createUser = ({ name, age = 18, role = 'guest' }) => {
  // 业务逻辑
};
```

## 1.4 返回值规范

- 函数应返回明确的类型，避免返回多种类型。
- 异步函数返回 Promise，保证可链式调用。
- 对于可能失败的操作，尽量返回标准结构，例如 { success: boolean, data?, error? }。

```js
const fetchUserData = async () => {
  try {
    const res = await api.getUserApi();
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error };
  }
};
```

## 1.5 异常处理

- 函数内部应尽量捕获异常，并给调用方明确返回。
- 对外暴露函数可以不捕获异常，让上层统一处理（例如全局错误拦截器）。

## 1.6 函数长度与复杂度

- 单个函数建议不超过 30 行，过长函数应拆分。
- 逻辑复杂部分可抽成私有辅助函数，提高可读性和复用性。
