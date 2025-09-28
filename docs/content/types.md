# 类型规范

## 概述

类型系统是现代前端开发的重要组成部分，特别是在 TypeScript 项目中。本规范定义了项目中类型定义、类型检查、类型安全等标准，旨在提高代码质量、减少运行时错误和增强开发体验。

## TypeScript 配置

### 基础配置

```json
// tsconfig.json (适合项目需要就好)
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": false,
    "strictFunctionTypes": false,
    "noImplicitThis": true,
    "jsx": "preserve",
    "importHelpers": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true,
    "baseUrl": ".",
    "allowJs": false,
    "resolveJsonModule": true,
    "lib": ["ESNext", "DOM"],
    "paths": {
      "@/*": ["src/*"],
      "@build/*": ["build/*"]
    },
    "types": ["node"]
  },
  "include": ["mock/*.ts", "src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "types/*.d.ts", "vite.config.ts"],
  "exclude": ["dist", "**/*.js", "node_modules"]
}
```

## 基础类型定义

### 原始类型使用

```typescript
// ✅ 基础类型定义
let userName: string = 'john_doe';
let userAge: number = 25;
let isActive: boolean = true;
let userTags: string[] = ['admin', 'premium'];
let userScores: Array<number> = [95, 87, 92];

// ✅ 字面量类型
type Theme = 'light' | 'dark' | 'auto';
type Size = 'small' | 'medium' | 'large';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// ✅ 联合类型
type ID = string | number;
type Status = 'pending' | 'approved' | 'rejected';
type ApiResponse<T> = T | { error: string };

// ✅ 可选和必需类型
let optionalValue?: string;          // 可选
let requiredValue!: string;          // 必需（断言赋值）
let nullableValue: string | null;    // 可为null
let undefinedValue: string | undefined; // 可为undefined
```

### 对象类型定义

```typescript
// ✅ 接口定义
interface User {
  readonly id: string; // 只读属性
  name: string; // 必需属性
  email: string;
  age?: number; // 可选属性
  tags: string[]; // 数组属性
  profile: {
    // 嵌套对象
    avatar?: string;
    bio?: string;
  };
}

interface UserWithMethods {
  id: string;
  name: string;

  // 方法定义
  getName(): string;
  setName(name: string): void;

  // 函数属性
  validate: (data: unknown) => boolean;

  // 索引签名
  [key: string]: any;
}

// ✅ 类型别名
type UserConfig = {
  theme: Theme;
  notifications: boolean;
  privacy: {
    showEmail: boolean;
    showAge: boolean;
  };
};

// ✅ 扩展和继承
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
  canManageUsers(): boolean;
}

type ExtendedUser = User & {
  preferences: UserConfig;
  createdAt: Date;
};
```

## 函数类型定义

### 函数签名

```typescript
// ✅ 函数类型定义
type EventHandler<T = Event> = (event: T) => void;
type AsyncHandler<T, R> = (data: T) => Promise<R>;
type Validator<T> = (value: T) => boolean;
type Transformer<T, R> = (input: T) => R;

// ✅ 函数声明类型
const processUser = (user: User): Promise<User> => {
  // 实现
  return Promise.resolve(user);
};

// ✅ 箭头函数类型
const calculateTotal = (items: Array<{ price: number }>): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ 函数重载
const parseValue = (value: string): string;
const parseValue = (value: number): number;
const parseValue = (value: boolean): boolean;
const parseValue = (value: string | number | boolean): string | number | boolean  =>{
  return value;
}

// ✅ 可选参数和默认值
const  createUser = (
  name: string,
  email: string,
  age?: number, // 可选参数
  role: string = 'user', // 默认值
  ...tags: string[] // 剩余参数
): User => {
  return {
    id: generateId(),
    name,
    email,
    age,
    tags,
    profile: {}
  };
}

// ✅ 回调函数类型
type ApiCallback<T> = {
  onSuccess: (data: T) => void;
  onError: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
};

const fetchUser = (id: string, callbacks: ApiCallback<User>): void  =>{
  // API调用实现
}
```

### 高阶函数类型

```typescript
// ✅ 高阶函数类型定义
type HigherOrderFunction<T, R> = (fn: (item: T) => R) => (items: T[]) => R[];

const mapArray: HigherOrderFunction<any, any> = fn => items => items.map(fn);

// ✅ 装饰器类型
type MethodDecorator = <T extends Function>(
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

// ✅ 中间件类型
type Middleware<T, R> = (data: T, next: (data: T) => R) => R;

type MiddlewareChain<T, R> = {
  use(middleware: Middleware<T, R>): MiddlewareChain<T, R>;
  execute(data: T): R;
};
```

## 泛型类型

### 基础泛型

```typescript
// ✅ 泛型函数
const identity = <T>(arg: T): T => arg;

const firstElement = <T>(arr: T[]): T | undefined => arr[0];

const mapArray = <T, R>(arr: T[], fn: (item: T) => R): R[] => arr.map(fn);

// ✅ 泛型接口
interface Repository<T, K = string> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: K): Promise<boolean>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  errors?: string[];
}

// ✅ 泛型类
class Cache<T> {
  private items: Map<string, T> = new Map();

  set(key: string, value: T): void {
    this.items.set(key, value);
  }

  get(key: string): T | undefined {
    return this.items.get(key);
  }

  has(key: string): boolean {
    return this.items.has(key);
  }
}
```

### 泛型约束

```typescript
// ✅ 基础约束
interface HasId {
  id: string;
}

const updateEntity = <T extends HasId>(entity: T, updates: Partial<T>): T => ({ ...entity, ...updates });

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
};

// ✅ 条件约束
type NonNullable<T> = T extends null | undefined ? never : T;
type Flatten<T> = T extends Array<infer U> ? U : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// ✅ 映射约束
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### 高级泛型模式

```typescript
// ✅ 条件类型
type ApiResult<T> = T extends string ? { text: T } : T extends number ? { value: T } : { data: T };

// ✅ 映射类型
type EventMap<T> = {
  [K in keyof T as `on${Capitalize<K & string>}`]: (value: T[K]) => void;
};

type User = {
  name: string;
  age: number;
};

type UserEvents = EventMap<User>; // { onName: (value: string) => void; onAge: (value: number) => void; }

// ✅ 递归类型
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

// ✅ 模板字面量类型
type HttpPath<T extends string> = `/${T}`;
type ApiEndpoint = HttpPath<'users' | 'orders' | 'products'>;

type CssProperty<T extends string> = `--${T}`;
type ThemeVariable = CssProperty<'primary-color' | 'secondary-color'>;
```

## 实用工具类型

### 内置工具类型

```typescript
// ✅ 对象转换工具类型
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Partial - 所有属性变为可选
type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; age?: number; isActive?: boolean; }

// Required - 所有属性变为必需
type RequiredUser = Required<PartialUser>;
// { id: string; name: string; email: string; age: number; isActive: boolean; }

// Pick - 选择指定属性
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// { id: string; name: string; email: string; }

// Omit - 排除指定属性
type CreateUserData = Omit<User, 'id'>;
// { name: string; email: string; age: number; isActive: boolean; }

// Record - 创建记录类型
type UserRoles = Record<'admin' | 'user' | 'guest', string[]>;
// { admin: string[]; user: string[]; guest: string[]; }

// Extract - 提取联合类型中的指定类型
type StringOrNumber = Extract<string | number | boolean, string | number>;
// string | number

// Exclude - 排除联合类型中的指定类型
type NonBooleanType = Exclude<string | number | boolean, boolean>;
// string | number
```

### 对象类型转换类

| 工具类型         | 功能                                         | 示例                                                            |
| ---------------- | -------------------------------------------- | --------------------------------------------------------------- |
| `Partial<T>`     | 将对象类型 `T` 的所有属性变为可选            | `Partial<{a: number, b: string}>` → `{a?: number, b?: string}`  |
| `Required<T>`    | 将对象类型 `T` 的所有属性变为必填            | `Required<{a?: number, b?: string}>` → `{a: number, b: string}` |
| `Readonly<T>`    | 将对象类型 `T` 的属性变为只读                | `Readonly<{a: number}>` → `{readonly a: number}`                |
| `Pick<T, K>`     | 从对象类型 `T` 中挑选属性 `K` 构成新类型     | `Pick<{a: number, b: string}, 'a'>` → `{a: number}`             |
| `Omit<T, K>`     | 从对象类型 `T` 中去掉属性 `K` 构成新类型     | `Omit<{a: number, b: string}, 'a'>` → `{b: string}`             |
| `Record<K, T>`   | 构造一个以 `K` 为键，值类型为 `T` 的对象类型 | `Record<'x'  \| 'y', number>`→`{x: number, y: number}`          |
| `Exclude<T, U>`  | 从联合类型 `T` 中排除可赋值给 `U` 的类型     | `Exclude<'a \| 'b' \| 'c', 'a'>`→`'b' \| 'c'`                   |
| `Extract<T, U>`  | 从联合类型 `T` 中提取可赋值给 `U` 的类型     | `Extract<'a' \| 'b' \| 'c', 'a' >`→`'a' \| 'c'`                 |
| `NonNullable<T>` | 去掉类型中 `null` 和 `undefined`             | `NonNullable<string \| null \| undefined>`→`string`             |

### 类型映射与条件类

| 工具类型                   | 功能                                      | 示例                                                                                |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| `ReturnType<T>`            | 获取函数类型 `T` 的返回类型               | `ReturnType<() => number>` → `number`                                               |
| `Parameters<T>`            | 获取函数类型 `T` 的参数类型组成的元组     | `Parameters<(x: string, y: number) => void>` → `[string, number]`                   |
| `ConstructorParameters<T>` | 获取构造函数类型 `T` 的参数类型组成的元组 | `ConstructorParameters<ErrorConstructor>` → `[string?]`                             |
| `InstanceType<T>`          | 获取构造函数 `T` 的实例类型               | `InstanceType<DateConstructor>` → `Date`                                            |
| `ThisParameterType<T>`     | 获取函数 `T` 的 `this` 参数类型           | `ThisParameterType<(this: HTMLElement) => void>` → `HTMLElement`                    |
| `OmitThisParameter<T>`     | 去掉函数 `T` 的 `this` 参数               | `OmitThisParameter<(this: HTMLElement, x: number) => void>` → `(x: number) => void` |
| `Awaited<T>`               | 获取 Promise 的解析类型                   | `Awaited<Promise<number>>` → `number`                                               |
| `ReturnType<T>`            | 获取函数返回值类型                        | `ReturnType<() => string>` → `string`                                               |

### 联合类型操作

| 工具类型          | 功能                         | 示例                                |
| ----------------- | ---------------------------- | ----------------------------------- |
| `Uppercase<S>`    | 将字符串字面量类型转为大写   | `Uppercase<'abc'>` → `'ABC'`        |
| `Lowercase<S>`    | 将字符串字面量类型转为小写   | `Lowercase<'ABC'>` → `'abc'`        |
| `Capitalize<S>`   | 将字符串字面量类型首字母大写 | `Capitalize<'hello'>` → `'Hello'`   |
| `Uncapitalize<S>` | 将字符串字面量类型首字母小写 | `Uncapitalize<'Hello'>` → `'hello'` |

### 辅助高级操作

| 工具类型                   | 功能                     | 示例                                                              |
| -------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `Parameters<T>`            | 获取函数参数类型         | `Parameters<(a: number, b: string) => void>` → `[number, string]` |
| `ConstructorParameters<T>` | 获取类构造函数参数类型   | `ConstructorParameters<DateConstructor>` → `[number?]`            |
| `InstanceType<T>`          | 获取类实例类型           | `InstanceType<typeof Date>` → `Date`                              |
| `Required<T>`              | 将类型中所有属性变为必填 | `Required<{a?: string}>` → `{a: string}`                          |

### 自定义工具类型

```typescript
// ✅ 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// ✅ 非空类型
type NonNullable<T> = T extends null | undefined ? never : T;

// ✅ 函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// ✅ 函数返回值类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// ✅ 可为空类型
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

// ✅ 键值对类型
type KeyValuePair<K extends string | number | symbol, V> = {
  key: K;
  value: V;
};

// ✅ 数组元素类型
type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

// ✅ Promise 解包类型
type Awaited<T> = T extends Promise<infer U> ? U : T;

// ✅ 函数重载类型
type Overload<T> = T extends {
  (...args: infer A1): infer R1;
  (...args: infer A2): infer R2;
  (...args: infer A3): infer R3;
}
  ? ((...args: A1) => R1) | ((...args: A2) => R2) | ((...args: A3) => R3)
  : T;
```
