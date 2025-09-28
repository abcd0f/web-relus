JSDoc 是一种用于 JavaScript 代码文档的注释格式，类似于 Java 的 Javadoc。通过使用特殊的标签（以 `@` 开头），开发者可以为函数、类、方法等代码元素提供结构化的文档。本指南将详细介绍各种 JSDoc 标签及其使用方法。

## 目录

- [速查表](#速查表)
  - [描述性标签](#描述性标签-1)
  - [类相关标签](#类相关标签-1)
  - [函数相关标签](#函数相关标签-1)
  - [模块和命名空间](#模块和命名空间-1)
  - [类型标签](#类型标签-1)
  - [继承和关系标签](#继承和关系标签-1)
  - [访问控制标签](#访问控制标签-1)
  - [其他标签](#其他标签-1)
  - [官方文档](#官方文档)

## 基础概念

JSDoc 注释通常位于代码元素之前，以 `/**` 开始，以 `*/` 结束。每行前面通常有一个星号 `*`。

```javascript
/**
 * 这是一个 JSDoc 注释
 * @标签 值
 */
```

## 描述性标签

### @description

提供对代码元素的详细描述。这是注释的主体部分。

```javascript
/**
 * @description 计算两个数字的和
 */
function add(a, b) {
  return a + b;
}
```

### @summary

提供简短的概述。通常用于长描述之前。

```javascript
/**
 * @summary 计算两数之和
 * @description 接受两个数字参数，返回它们的加和
 */
function add(a, b) {
  return a + b;
}
```

### @example

提供如何使用代码的示例。

```javascript
/**
 * 计算两个数字的和
 * @example
 * // 返回 3
 * add(1, 2);
 */
function add(a, b) {
  return a + b;
}
```

### @since

指明功能是从哪个版本开始添加的。

```javascript
/**
 * 计算两个数字的和
 * @since 1.0.0
 */
function add(a, b) {
  return a + b;
}
```

### @deprecated

表示该功能已经被废弃，通常会提供替代方案。

```javascript
/**
 * 计算两个数字的和
 * @deprecated 使用 sum() 代替
 */
function add(a, b) {
  return a + b;
}
```

### @todo

标记需要完成的工作。

```javascript
/**
 * 计算两个数字的和
 * @todo 添加对非数字输入的验证
 */
function add(a, b) {
  return a + b;
}
```

### @author

指定代码的作者。

```javascript
/**
 * 数学工具库
 * @author 张三 <zhangsan@example.com>
 */
const MathUtils = {};
```

### @version

指定代码的版本。

```javascript
/**
 * 数学工具库
 * @version 1.0.0
 */
const MathUtils = {};
```

### @copyright

提供版权信息。

```javascript
/**
 * 数学工具库
 * @copyright 2025 Example Corp.
 */
const MathUtils = {};
```

### @license

提供许可证信息。

```javascript
/**
 * 数学工具库
 * @license MIT
 */
const MathUtils = {};
```

## 类相关标签

### @class

标记一个函数作为构造函数，用于创建新的类。

```javascript
/**
 * 表示一个人的类
 * @class
 */
function Person(name) {
  this.name = name;
}
```

### @classdesc

为类提供描述，与 `@class` 一起使用。

```javascript
/**
 * @class
 * @classdesc 表示一个有姓名的人
 */
function Person(name) {
  this.name = name;
}
```

### @constructor

标记一个函数为构造函数，与 `@class` 类似。

```javascript
/**
 * @constructor
 * @param {string} name - 人的姓名
 */
function Person(name) {
  this.name = name;
}
```

### @hideconstructor

表示构造函数应该在文档中隐藏。

```javascript
/**
 * 单例模式的日志记录器
 * @hideconstructor
 */
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this;
  }
}
```

### @constructs

表示一个函数将会把对象添加到另一个对象的 `prototype` 上。

```javascript
/**
 * @class
 */
function Person() {}

/**
 * @constructs
 */
Person.prototype.initialize = function (name) {
  this.name = name;
};
```

### @instance

标记一个变量作为类的实例。

```javascript
/**
 * @class
 */
function Person() {}

/**
 * 默认的人实例
 * @instance
 */
const defaultPerson = new Person();
```

### @interface

标记一个函数为接口。

```javascript
/**
 * 可比较对象的接口
 * @interface
 */
function Comparable() {}

/**
 * 比较此对象与另一个对象
 * @method
 * @name Comparable#compare
 * @param {Object} other - 要比较的对象
 * @returns {number} 比较结果
 */
```

## 函数相关标签

### @function

标记一个对象为函数。

```javascript
/**
 * 计算两个数字的和
 * @function
 */
const add = function (a, b) {
  return a + b;
};
```

### @method

标记一个对象为方法，通常是类或对象的一部分。

```javascript
/**
 * @class
 */
function MathUtils() {}

/**
 * 计算两个数字的和
 * @method
 */
MathUtils.prototype.add = function (a, b) {
  return a + b;
};
```

### @param

描述函数参数。

```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
function add(a, b) {
  return a + b;
}
```

### @argument

`@param` 的别名，描述函数参数。

```javascript
/**
 * 计算两个数字的和
 * @argument {number} a - 第一个数字
 * @argument {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
function add(a, b) {
  return a + b;
}
```

### @returns

描述函数的返回值。

```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
function add(a, b) {
  return a + b;
}
```

### @throws

描述函数可能抛出的异常。

```javascript
/**
 * 除法运算
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @returns {number} 除法结果
 * @throws {Error} 当除数为 0 时抛出异常
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为 0');
  }
  return a / b;
}
```

### @async

标记一个函数为异步函数。

```javascript
/**
 * 异步获取用户数据
 * @async
 * @param {number} id - 用户 ID
 * @returns {Promise<Object>} 用户数据
 */
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### @generator

标记一个函数为生成器函数。

```javascript
/**
 * 生成连续的数字
 * @generator
 * @yields {number} 连续的数字
 */
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
```

### @yields

描述生成器函数的 yield 值。

```javascript
/**
 * 生成斐波那契数列
 * @generator
 * @yields {number} 斐波那契数列中的下一个数
 */
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
```

### @callback

描述回调函数的类型。

```javascript
/**
 * 回调函数，处理操作结果
 * @callback resultCallback
 * @param {Error|null} err - 错误对象，如果没有错误则为 null
 * @param {Object} [result] - 操作结果，如果有错误则不存在
 */

/**
 * 执行异步操作
 * @param {Object} options - 操作选项
 * @param {resultCallback} callback - 操作完成后的回调函数
 */
function doAsync(options, callback) {
  // 实现...
}
```

### @overload

标记函数有多个实现（重载）。

```javascript
/**
 * @overload
 * @param {string} name - 人的姓名
 */

/**
 * @overload
 * @param {Object} options - 人的选项
 * @param {string} options.name - 人的姓名
 */

/**
 * 创建一个人
 * @param {string|Object} nameOrOptions - 姓名或配置对象
 */
function createPerson(nameOrOptions) {
  // 实现...
}
```

## 模块和命名空间

### @module

标记一个文件为模块。

```javascript
/**
 * 数学工具模块
 * @module math-utils
 */

/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
export function add(a, b) {
  return a + b;
}
```

### @exports

标记模块导出的内容。

```javascript
/**
 * 数学工具模块
 * @module math-utils
 */

/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 * @exports
 */
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

### @namespace

标记一个对象为命名空间。

```javascript
/**
 * 数学工具命名空间
 * @namespace
 */
const MathUtils = {};

/**
 * 计算两个数字的和
 * @function
 * @memberof MathUtils
 */
MathUtils.add = function (a, b) {
  return a + b;
};
```

### @memberof

标记一个符号属于某个父符号。

```javascript
/**
 * 数学工具命名空间
 * @namespace
 */
const MathUtils = {};

/**
 * 计算两个数字的和
 * @function
 * @memberof MathUtils
 */
MathUtils.add = function (a, b) {
  return a + b;
};
```

### @requires

标记模块依赖。

```javascript
/**
 * 用户服务模块
 * @module user-service
 * @requires axios
 * @requires ./config
 */
const axios = require('axios');
const config = require('./config');
```

## 类型标签

### @type

指定变量的类型。

```javascript
/**
 * 数组中的最大元素数量
 * @type {number}
 */
const MAX_ITEMS = 100;
```

### @typedef

定义自定义类型。

```javascript
/**
 * 用户对象类型
 * @typedef {Object} User
 * @property {string} id - 用户 ID
 * @property {string} name - 用户名
 * @property {string} email - 邮箱地址
 */

/**
 * 当前用户
 * @type {User}
 */
const currentUser = { id: '1', name: 'admin', email: 'admin@example.com' };
```

### @template

定义泛型类型参数。

```javascript
/**
 * 通用列表类
 * @template T 列表元素的类型
 */
class List {
  /**
   * @param {T[]} items - 初始元素
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * 添加元素到列表
   * @param {T} item - 要添加的元素
   */
  add(item) {
    this.items.push(item);
  }
}
```

### @var

标记一个变量。

```javascript
/**
 * PI 常量
 * @var {number}
 */
const PI = 3.14159;
```

### @constant

标记一个常量。

```javascript
/**
 * 最大尝试次数
 * @constant {number}
 */
const MAX_ATTEMPTS = 3;
```

### @default

指定参数的默认值。

```javascript
/**
 * 格式化字符串
 * @param {string} str - 要格式化的字符串
 * @param {Object} [options={}] - 格式化选项
 * @param {boolean} [options.uppercase=false] - 是否转为大写
 * @default options={}
 */
function format(str, options = {}) {
  // 实现...
}
```

### @property

描述对象的属性。

```javascript
/**
 * 配置对象
 * @typedef {Object} Config
 * @property {string} host - 服务器主机名
 * @property {number} port - 服务器端口
 * @property {Object} auth - 认证信息
 * @property {string} auth.username - 用户名
 * @property {string} auth.password - 密码
 */
```

### @prop

`@property` 的别名。

```javascript
/**
 * 配置对象
 * @typedef {Object} Config
 * @prop {string} host - 服务器主机名
 * @prop {number} port - 服务器端口
 */
```

## 继承和关系标签

### @extends

表示一个类继承自另一个类。

```javascript
/**
 * 基础动物类
 * @class
 */
class Animal {
  constructor(name) {
    this.name = name;
  }
}

/**
 * 猫类
 * @class
 * @extends Animal
 */
class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  meow() {
    console.log('喵喵!');
  }
}
```

### @augments

`@extends` 的别名。

```javascript
/**
 * 基础动物类
 * @class
 */
class Animal {
  constructor(name) {
    this.name = name;
  }
}

/**
 * 猫类
 * @class
 * @augments Animal
 */
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}
```

### @implements

表示一个类实现了一个接口。

```javascript
/**
 * 可比较接口
 * @interface
 */
class Comparable {
  /**
   * 比较方法
   * @param {Object} other - 要比较的对象
   * @returns {number} 比较结果
   */
  compare(other) {}
}

/**
 * 整数类
 * @class
 * @implements Comparable
 */
class Integer {
  constructor(value) {
    this.value = value;
  }

  /**
   * 比较两个整数
   * @param {Integer} other - 要比较的整数
   * @returns {number} 比较结果
   */
  compare(other) {
    return this.value - other.value;
  }
}
```

### @mixes

表示一个对象混入了其他对象的功能。

```javascript
/**
 * 日志混入
 * @mixin
 */
const LoggerMixin = {
  /**
   * 记录日志
   * @param {string} message - 日志消息
   */
  log(message) {
    console.log(`[LOG] ${message}`);
  }
};

/**
 * 用户服务
 * @class
 * @mixes LoggerMixin
 */
class UserService {
  constructor() {
    Object.assign(this, LoggerMixin);
  }

  getUser(id) {
    this.log(`获取用户 ${id}`);
    // 实现...
  }
}
```

### @inheritdoc

表示继承上级元素的文档。

```javascript
/**
 * 基础控制器
 * @class
 */
class BaseController {
  /**
   * 处理请求
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   */
  handle(req, res) {
    // 基础实现
  }
}

/**
 * 用户控制器
 * @class
 * @extends BaseController
 */
class UserController extends BaseController {
  /**
   * @inheritdoc
   */
  handle(req, res) {
    // 特定实现
  }
}
```

### @lends

表示将对象的所有属性归属于某个类。

```javascript
/**
 * 创建一个人的类
 * @class
 */
var Person = function (name) {
  this.name = name;
};

/**
 * @lends Person.prototype
 */
var proto = {
  /**
   * 获取姓名
   * @returns {string} 姓名
   */
  getName: function () {
    return this.name;
  }
};

Object.assign(Person.prototype, proto);
```

### @borrows

表示一个对象借用另一个对象的文档。

```javascript
/**
 * 格式化工具
 * @namespace
 */
const Formatter = {
  /**
   * 格式化日期
   * @param {Date} date - 要格式化的日期
   * @returns {string} 格式化后的日期字符串
   */
  formatDate(date) {
    return date.toISOString().split('T')[0];
  }
};

/**
 * 日期工具
 * @namespace
 * @borrows Formatter.formatDate as format
 */
const DateUtils = {
  format: Formatter.formatDate
};
```

## 访问控制标签

### @public

表示成员为公开的（默认）。

```javascript
/**
 * @class
 */
class Person {
  /**
   * 获取姓名
   * @public
   * @returns {string} 姓名
   */
  getName() {
    return this.name;
  }
}
```

### @private

表示成员为私有的。

```javascript
/**
 * @class
 */
class Person {
  constructor(name) {
    /**
     * 姓名
     * @private
     * @type {string}
     */
    this._name = name;
  }
}
```

### @protected

表示成员为受保护的。

```javascript
/**
 * @class
 */
class Person {
  constructor(name) {
    /**
     * 姓名
     * @protected
     * @type {string}
     */
    this._name = name;
  }
}
```

### @access

指定访问级别，可以是 `public`、`private` 或 `protected`。

```javascript
/**
 * @class
 */
class Person {
  constructor(name, age) {
    /**
     * 姓名
     * @access public
     * @type {string}
     */
    this.name = name;

    /**
     * 年龄
     * @access private
     * @type {number}
     */
    this._age = age;
  }
}
```

### @readonly

表示成员为只读的。

```javascript
/**
 * @class
 */
class Person {
  constructor(name) {
    /**
     * 唯一标识符
     * @readonly
     * @type {string}
     */
    this.id = Math.random().toString(36).substr(2, 9);

    this.name = name;
  }
}
```

### @package

表示成员的可见性为包级别。

```javascript
/**
 * @class
 */
class Person {
  constructor(name) {
    /**
     * 内部 ID
     * @package
     * @type {string}
     */
    this._internalId = Math.random().toString(36).substr(2, 9);

    this.name = name;
  }
}
```

## 其他标签

### @abstract

标记一个方法为抽象方法，需要在子类中实现。

```javascript
/**
 * 抽象形状类
 * @abstract
 * @class
 */
class Shape {
  /**
   * 计算面积
   * @abstract
   * @returns {number} 面积
   */
  area() {
    throw new Error('抽象方法必须在子类中实现');
  }
}
```

### @alias

为成员提供别名。

```javascript
/**
 * 数学工具
 * @namespace
 */
const MathUtils = {};

/**
 * 计算两个数字的和
 * @function
 * @alias MathUtils.add
 */
MathUtils.add = function (a, b) {
  return a + b;
};
```

### @event

描述事件。

```javascript
/**
 * 用户类
 * @class
 */
class User {
  /**
   * 用户登录事件
   * @event User#login
   * @type {Object}
   * @property {string} username - 登录的用户名
   * @property {Date} time - 登录时间
   */

  login(username, password) {
    // 登录逻辑...

    /**
     * 登录事件
     * @event User#login
     */
    this.emit('login', {
      username,
      time: new Date()
    });
  }
}
```

### @emits

标记方法发出的事件。

```javascript
/**
 * 用户类
 * @class
 */
class User {
  /**
   * 用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @emits User#login
   */
  login(username, password) {
    // 登录逻辑...
    this.emit('login', { username, time: new Date() });
  }
}
```

### @fires

`@emits` 的别名。

```javascript
/**
 * 用户服务
 * @class
 */
class UserService {
  /**
   * 创建新用户
   * @param {Object} data - 用户数据
   * @fires UserService#userCreated
   */
  createUser(data) {
    // 创建用户逻辑...
    this.emit('userCreated', { user: newUser });
  }
}
```

### @listens

标记类或方法监听的事件。

```javascript
/**
 * 日志服务
 * @class
 */
class LogService {
  constructor(userService) {
    /**
     * 记录用户创建
     * @listens UserService#userCreated
     */
    userService.on('userCreated', this.logUserCreation.bind(this));
  }

  /**
   * 记录用户创建
   * @param {Object} event - 事件对象
   */
  logUserCreation(event) {
    console.log(`用户已创建: ${event.user.name}`);
  }
}
```

### @file

提供当前文件的描述。

```javascript
/**
 * @file 数学工具库 - 提供各种数学计算函数
 */

/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
function add(a, b) {
  return a + b;
}
```

### @fileoverview

`@file` 的别名。

```javascript
/**
 * @fileoverview 用户管理模块 - 处理用户相关操作
 */

/**
 * 用户类
 * @class
 */
class User {
  constructor(name) {
    this.name = name;
  }
}
```

### @this

描述 this 关键字在函数中的含义。

```javascript
/**
 * 任务方法
 * @this {TaskRunner} TaskRunner 实例
 */
function run() {
  this.isRunning = true;
  console.log(`任务正在运行: ${this.name}`);
}

const taskRunner = {
  name: '主任务',
  isRunning: false,
  run: run
};
```

### @global

标记一个成员为全局的。

```javascript
(function () {
  /**
   * 全局错误处理函数
   * @global
   * @param {Error} error - 错误对象
   */
  window.handleError = function (error) {
    console.error('发生错误:', error);
  };
})();
```

### @link

创建指向其他文档的链接。

```javascript
/**
 * 用户管理器类
 * @see {@link UserService} 用于底层 API 调用
 */
class UserManager {
  constructor(service) {
    this.service = service;
  }
}
```

### @linkcode

创建指向代码的链接。

```javascript
/**
 * 格式化日期
 * 使用 {@linkcode DateUtils.format} 内部进行格式化
 */
function prettyDate(date) {
  return DateUtils.format(date, 'YYYY-MM-DD');
}
```

### @linkplain

创建指向其他文档的纯文本链接。

```javascript
/**
 * 用户验证
 * 详见 {@linkplain Auth.validateUser} 了解验证流程
 */
function checkUser(user) {
  return Auth.validateUser(user);
}
```

### @see

引用其他文档项。

```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 * @see subtract 相反操作
 */
function add(a, b) {
  return a + b;
}

/**
 * 计算两个数字的差
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的差
 */
function subtract(a, b) {
  return a - b;
}
```

### @tutorial

引用教程文档。

```javascript
/**
 * 用户认证模块
 * @tutorial user-authentication
 */
const Auth = {
  /**
   * 登录方法
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise<Object>} 用户信息
   */
  login(username, password) {
    // 实现...
  }
};
```

### @external

标记外部类或命名空间。

```javascript
/**
 * jQuery 库
 * @external jQuery
 * @see {@link https://jquery.com/|jQuery}
 */

/**
 * 选择元素并添加类
 * @param {string} selector - CSS 选择器
 * @param {string} className - 要添加的类名
 * @returns {external:jQuery} jQuery 对象
 */
function selectAndAddClass(selector, className) {
  return $(selector).addClass(className);
}
```

### @host

指定主机对象。

```javascript
/**
 * @host MyLibrary
 */

/**
 * 工具函数
 * @namespace
 */
MyLibrary.utils = {};
```

### @inner

标记成员为内部的。

```javascript
/**
 * 数学工具
 * @namespace
 */
const MathUtils = {};

(function() {
    /**
     * 内部辅助函数
     * @inner
     * @param {number} x - 输入值
     * @returns {number} 处理后的值
     */
    function helper(x) {
        return x * x;
    }

    /**
     * 计算平方
     * @
```

### @inner

标记成员为内部的。

```javascript
/**
 * 数学工具
 * @namespace
 */
const MathUtils = {};

(function () {
  /**
   * 内部辅助函数
   * @inner
   * @param {number} x - 输入值
   * @returns {number} 处理后的值
   */
  function helper(x) {
    return x * x;
  }

  /**
   * 计算平方
   * @param {number} x - 要平方的数字
   * @returns {number} x 的平方
   */
  MathUtils.square = function (x) {
    return helper(x);
  };
})();
```

### @satisfies

表示变量满足指定的类型。

```javascript
/**
 * @typedef {Object} Point
 * @property {number} x - X 坐标
 * @property {number} y - Y 坐标
 */

/**
 * 创建点的函数
 * @returns {Object} 点对象
 * @satisfies {Point}
 */
function createPoint() {
  return { x: 0, y: 0 };
}
```

### @kind

指定元素的种类。可能的值包括 `class`, `constant`, `event`, `external`, `file`, `function`, `member`, `mixin`, `module`, `namespace`, `typedef` 等。

```javascript
/**
 * 数学常量
 * @kind namespace
 */
const MathConstants = {
  /**
   * 圆周率
   * @kind constant
   * @type {number}
   */
  PI: 3.14159
};
```

### @name

指定元素的名称。

```javascript
/**
 * 计算两个数字的和
 * @name add
 * @function
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 */
const add = function (a, b) {
  return a + b;
};
```

### @field

标记一个变量作为类或对象的字段。

```javascript
/**
 * 用户类
 * @class
 */
class User {
  constructor(name) {
    /**
     * 用户名
     * @field
     * @type {string}
     */
    this.name = name;
  }
}
```

### @static

标记一个成员为静态的。

```javascript
/**
 * 用户类
 * @class
 */
class User {
  /**
   * 创建新用户
   * @static
   * @param {string} name - 用户名
   * @returns {User} 用户实例
   */
  static create(name) {
    return new User(name);
  }

  constructor(name) {
    this.name = name;
  }
}
```

### @variation

标记元素的变体。

```javascript
/**
 * 格式化日期
 * @variation 1
 * @param {Date} date - 日期对象
 * @returns {string} YYYY-MM-DD 格式的日期
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 格式化日期
 * @variation 2
 * @param {Date} date - 日期对象
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期
 */
function formatDate(date, format) {
  // 高级格式化实现...
}
```

### @virtual

标记一个方法可以被子类重写。

```javascript
/**
 * 基础组件类
 * @class
 */
class Component {
  /**
   * 渲染组件
   * @virtual
   * @returns {string} 渲染后的 HTML
   */
  render() {
    return '<div></div>';
  }
}

/**
 * 按钮组件
 * @class
 * @extends Component
 */
class Button extends Component {
  /**
   * 重写渲染方法
   * @returns {string} 按钮 HTML
   */
  render() {
    return '<button>点击</button>';
  }
}
```

## 复合示例

下面是一些复合示例，展示了在实际项目中多个标签如何一起使用。

### 模块示例

```javascript
/**
 * @module user-service
 * @description 用户服务模块，提供用户管理功能
 * @author 张三 <zhangsan@example.com>
 * @version 1.2.0
 * @since 1.0.0
 * @requires axios
 * @requires ./config
 */

const axios = require('axios');
const config = require('./config');

/**
 * 用户类
 * @class
 * @classdesc 表示系统中的一个用户
 */
class User {
  /**
   * 创建用户实例
   * @constructor
   * @param {Object} data - 用户数据
   * @param {string} data.id - 用户 ID
   * @param {string} data.name - 用户名
   * @param {string} data.email - 邮箱
   */
  constructor(data) {
    /**
     * 用户 ID
     * @type {string}
     * @readonly
     */
    this.id = data.id;

    /**
     * 用户名
     * @type {string}
     */
    this.name = data.name;

    /**
     * 邮箱
     * @type {string}
     */
    this.email = data.email;

    /**
     * 创建时间
     * @type {Date}
     * @private
     */
    this._createdAt = new Date();
  }

  /**
   * 获取用户显示名称
   * @returns {string} 显示名称
   */
  getDisplayName() {
    return this.name || this.email;
  }
}

/**
 * 用户服务
 * @class
 */
class UserService {
  /**
   * 获取用户
   * @async
   * @param {string} id - 用户 ID
   * @returns {Promise<User>} 用户对象
   * @throws {Error} 如果用户不存在
   */
  async getUser(id) {
    try {
      const response = await axios.get(`${config.apiUrl}/users/${id}`);
      return new User(response.data);
    } catch (error) {
      throw new Error(`获取用户失败: ${error.message}`);
    }
  }

  /**
   * 创建用户
   * @async
   * @param {Object} data - 用户数据
   * @param {string} data.name - 用户名
   * @param {string} data.email - 邮箱
   * @returns {Promise<User>} 创建的用户
   * @fires UserService#userCreated
   */
  async createUser(data) {
    try {
      const response = await axios.post(`${config.apiUrl}/users`, data);
      const user = new User(response.data);

      /**
       * 用户创建事件
       * @event UserService#userCreated
       * @type {Object}
       * @property {User} user - 创建的用户
       * @property {Date} time - 创建时间
       */
      this.emit('userCreated', {
        user,
        time: new Date()
      });

      return user;
    } catch (error) {
      throw new Error(`创建用户失败: ${error.message}`);
    }
  }
}

/**
 * 默认用户服务实例
 * @type {UserService}
 * @exports
 */
module.exports = new UserService();
```

### 类型定义示例

```javascript
/**
 * @typedef {Object} Address
 * @property {string} street - 街道
 * @property {string} city - 城市
 * @property {string} state - 州/省
 * @property {string} zipCode - 邮编
 * @property {string} [country='中国'] - 国家，默认为中国
 */

/**
 * @typedef {Object} Contact
 * @property {string} phone - 电话号码
 * @property {string} email - 电子邮件
 * @property {Address} address - 地址
 */

/**
 * @typedef {Object} UserDetails
 * @property {string} id - 用户 ID
 * @property {string} username - 用户名
 * @property {string} fullName - 全名
 * @property {Date} birthDate - 出生日期
 * @property {Contact} contact - 联系方式
 * @property {string[]} roles - 角色列表
 * @property {Object.<string, boolean>} permissions - 权限映射
 */

/**
 * 验证用户详情
 * @param {UserDetails} user - 用户详情
 * @returns {boolean} 是否有效
 */
function validateUser(user) {
  // 实现...
  return true;
}
```

### 回调和 Promise 示例

```javascript
/**
 * 结果回调函数
 * @callback ResultCallback
 * @param {Error|null} error - 错误对象，成功时为 null
 * @param {*} [result] - 结果数据，出错时不存在
 */

/**
 * 读取文件内容
 * @param {string} path - 文件路径
 * @param {ResultCallback} callback - 回调函数
 */
function readFile(path, callback) {
  fs.readFile(path, 'utf8', callback);
}

/**
 * 异步读取文件内容（Promise 版本）
 * @param {string} path - 文件路径
 * @returns {Promise<string>} 包含文件内容的 Promise
 * @throws {Error} 如果读取失败
 */
async function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

### 模板和泛型示例

```javascript
/**
 * 通用缓存类
 * @template K 键类型
 * @template V 值类型
 */
class Cache {
  constructor() {
    /**
     * 存储对象
     * @type {Map<K, V>}
     * @private
     */
    this._storage = new Map();
  }

  /**
   * 设置缓存项
   * @param {K} key - 键
   * @param {V} value - 值
   * @returns {this} 链式调用
   */
  set(key, value) {
    this._storage.set(key, value);
    return this;
  }

  /**
   * 获取缓存项
   * @param {K} key - 键
   * @returns {V|undefined} 值，不存在时为 undefined
   */
  get(key) {
    return this._storage.get(key);
  }
}

/**
 * 创建字符串缓存
 * @returns {Cache<string, string>} 字符串缓存
 */
function createStringCache() {
  return new Cache();
}
```

## 最佳实践

在使用 JSDoc 时，以下是一些推荐的最佳实践：

### 一致性

在整个项目中保持一致的文档风格和标签使用。

```javascript
// 好的实践: 所有函数都使用相同的文档模式
/**
 * 函数 A
 * @param {string} param - 参数
 * @returns {number} 结果
 */
function functionA(param) {}

/**
 * 函数 B
 * @param {boolean} flag - 标志
 * @returns {string} 结果
 */
function functionB(flag) {}
```

### 简洁明了

保持文档简洁但信息丰富。

```javascript
// 好的实践: 简洁明了
/**
 * 解析 JSON 字符串
 * @param {string} json - JSON 字符串
 * @returns {Object} 解析后的对象
 * @throws {SyntaxError} 如果 JSON 格式无效
 */
function parseJson(json) {
  return JSON.parse(json);
}
```

### 类型描述

尽可能详细地描述类型，包括复杂类型和可能的值。

```javascript
/**
 * 配置对象
 * @typedef {Object} Config
 * @property {string} endpoint - API 端点
 * @property {number} [timeout=30000] - 超时时间（毫秒）
 * @property {'GET'|'POST'|'PUT'|'DELETE'} method - HTTP 方法
 * @property {Object.<string, string>} headers - HTTP 头
 */
```

### 完整的示例

为复杂功能提供示例，帮助用户理解如何使用。

```javascript
/**
 * 格式化货币
 * @param {number} amount - 金额
 * @param {string} [currency='CNY'] - 货币代码
 * @param {string} [locale='zh-CN'] - 区域设置
 * @returns {string} 格式化后的货币字符串
 * @example
 * // 返回 "¥1,234.56"
 * formatCurrency(1234.56);
 *
 * // 返回 "$1,234.56"
 * formatCurrency(1234.56, 'USD', 'en-US');
 */
function formatCurrency(amount, currency = 'CNY', locale = 'zh-CN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}
```

## 总结

JSDoc 是一个强大的文档生成工具，可以帮助开发者创建清晰、结构化和易于理解的代码文档。通过使用各种标签，可以描述代码的各个方面，包括：

1. 函数和方法的参数、返回值和抛出的异常
2. 类、接口和类型定义
3. 访问级别和可见性
4. 代码元素之间的关系
5. 事件和回调
6. 示例和教程

良好的文档不仅有助于其他开发者理解代码，也有助于集成开发环境（IDE）提供更好的代码补全和类型检查。在大型项目中，投入时间编写详细的 JSDoc 注释是非常值得的。

# 速查表

下表提供了常用 JSDoc 标签的简明参考，便于快速查找和使用。

## 描述性标签

| 标签           | 说明             | 示例                                  |
| -------------- | ---------------- | ------------------------------------- |
| `@description` | 提供详细描述     | `@description 计算两个数字的和`       |
| `@summary`     | 提供简短概述     | `@summary 简单求和函数`               |
| `@example`     | 提供使用示例     | `@example add(1, 2); // 返回 3`       |
| `@since`       | 指明功能起始版本 | `@since 1.0.0`                        |
| `@deprecated`  | 标记已废弃功能   | `@deprecated 使用 sum() 代替`         |
| `@todo`        | 标记待完成工作   | `@todo 添加输入验证`                  |
| `@author`      | 指定作者         | `@author 张三 <zhangsan@example.com>` |
| `@version`     | 指定版本         | `@version 1.0.0`                      |
| `@copyright`   | 提供版权信息     | `@copyright 2025 Example Corp.`       |
| `@license`     | 提供许可证信息   | `@license MIT`                        |

## 类相关标签

| 标签               | 说明               | 示例                        |
| ------------------ | ------------------ | --------------------------- |
| `@class`           | 标记构造函数       | `@class`                    |
| `@classdesc`       | 提供类描述         | `@classdesc 表示一个人的类` |
| `@constructor`     | 标记构造函数       | `@constructor`              |
| `@hideconstructor` | 隐藏构造函数       | `@hideconstructor`          |
| `@constructs`      | 标记创建对象的函数 | `@constructs`               |
| `@instance`        | 标记类实例         | `@instance`                 |
| `@interface`       | 标记接口           | `@interface`                |

## 函数相关标签

| 标签         | 说明                | 示例                                |
| ------------ | ------------------- | ----------------------------------- |
| `@function`  | 标记函数            | `@function`                         |
| `@method`    | 标记方法            | `@method`                           |
| `@param`     | 描述参数            | `@param {number} a - 第一个数字`    |
| `@argument`  | `@param` 的别名     | `@argument {number} a - 第一个数字` |
| `@returns`   | 描述返回值          | `@returns {number} 两个数字的和`    |
| `@throws`    | 描述可能的异常      | `@throws {Error} 当除数为 0 时`     |
| `@async`     | 标记异步函数        | `@async`                            |
| `@generator` | 标记生成器函数      | `@generator`                        |
| `@yields`    | 描述生成器 yield 值 | `@yields {number} 连续的数字`       |
| `@callback`  | 描述回调函数类型    | `@callback resultCallback`          |
| `@overload`  | 标记函数重载        | `@overload`                         |

## 模块和命名空间

| 标签         | 说明           | 示例                  |
| ------------ | -------------- | --------------------- |
| `@module`    | 标记模块       | `@module math-utils`  |
| `@exports`   | 标记模块导出   | `@exports`            |
| `@namespace` | 标记命名空间   | `@namespace`          |
| `@memberof`  | 标记所属父符号 | `@memberof MathUtils` |
| `@requires`  | 标记依赖       | `@requires axios`     |

## 类型标签

| 标签        | 说明               | 示例                               |
| ----------- | ------------------ | ---------------------------------- |
| `@type`     | 指定变量类型       | `@type {number}`                   |
| `@typedef`  | 定义自定义类型     | `@typedef {Object} User`           |
| `@template` | 定义泛型参数       | `@template T`                      |
| `@var`      | 标记变量           | `@var {number}`                    |
| `@constant` | 标记常量           | `@constant {number}`               |
| `@default`  | 指定默认值         | `@default options={}`              |
| `@property` | 描述对象属性       | `@property {string} name - 用户名` |
| `@prop`     | `@property` 的别名 | `@prop {string} name - 用户名`     |

## 继承和关系标签

| 标签          | 说明              | 示例                                      |
| ------------- | ----------------- | ----------------------------------------- |
| `@extends`    | 标记类继承        | `@extends Animal`                         |
| `@augments`   | `@extends` 的别名 | `@augments Animal`                        |
| `@implements` | 标记接口实现      | `@implements Comparable`                  |
| `@mixes`      | 标记混入          | `@mixes LoggerMixin`                      |
| `@inheritdoc` | 继承文档          | `@inheritdoc`                             |
| `@lends`      | 指定属性归属      | `@lends Person.prototype`                 |
| `@borrows`    | 借用文档          | `@borrows Formatter.formatDate as format` |

## 访问控制标签

| 标签         | 说明             | 示例              |
| ------------ | ---------------- | ----------------- |
| `@public`    | 标记公开成员     | `@public`         |
| `@private`   | 标记私有成员     | `@private`        |
| `@protected` | 标记受保护成员   | `@protected`      |
| `@access`    | 指定访问级别     | `@access private` |
| `@readonly`  | 标记只读成员     | `@readonly`       |
| `@package`   | 标记包级别可见性 | `@package`        |

## 其他标签

| 标签            | 说明                | 示例                                  |
| --------------- | ------------------- | ------------------------------------- |
| `@abstract`     | 标记抽象方法        | `@abstract`                           |
| `@alias`        | 提供别名            | `@alias MathUtils.add`                |
| `@event`        | 描述事件            | `@event User#login`                   |
| `@emits`        | 标记发出的事件      | `@emits User#login`                   |
| `@fires`        | `@emits` 的别名     | `@fires UserService#userCreated`      |
| `@listens`      | 标记监听的事件      | `@listens UserService#userCreated`    |
| `@file`         | 提供文件描述        | `@file 数学工具库`                    |
| `@fileoverview` | `@file` 的别名      | `@fileoverview 用户管理模块`          |
| `@this`         | 描述 this 含义      | `@this {TaskRunner}`                  |
| `@global`       | 标记全局成员        | `@global`                             |
| `@link`         | 创建文档链接        | `@see {@link UserService}`            |
| `@linkcode`     | 创建代码链接        | `@see {@linkcode DateUtils.format}`   |
| `@linkplain`    | 创建纯文本链接      | `@see {@linkplain Auth.validateUser}` |
| `@see`          | 引用其他文档        | `@see subtract 相反操作`              |
| `@tutorial`     | 引用教程            | `@tutorial user-authentication`       |
| `@external`     | 标记外部类/命名空间 | `@external jQuery`                    |
| `@host`         | 指定主机对象        | `@host MyLibrary`                     |
| `@inner`        | 标记内部成员        | `@inner`                              |
| `@satisfies`    | 标记类型满足接口    | `@satisfies {Comparable}`             |
| `@kind`         | 指定元素类型        | `@kind class`                         |
| `@name`         | 指定元素名称        | `@name add`                           |
| `@field`        | 标记类字段          | `@field`                              |
| `@static`       | 标记静态成员        | `@static`                             |
| `@variation`    | 标记变体            | `@variation 2`                        |
| `@virtual`      | 标记可被重写的方法  | `@virtual`                            |

## 官方文档

官方文档：[JSDoc Documentation](https://jsdoc.app/)
