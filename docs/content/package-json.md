# package.json

## 概述

在前端项目中，package.json 是一个核心的配置文件，它扮演着项目“清单”和“配置中心”的角色。可以把它理解为整个前端项目的“元信息+依赖管理+脚本管理”的集合。

::: tip
这不是一个规范，只是 package.json 的一个核心配置文件，只是前端项目开发中，package.json 的作用远不止这些。
:::

## 基本信息（Meta 信息）

package.json 中可以定义项目的基本信息，比如：

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "这是一个前端示例项目",
  "author": "张三",
  "license": "MIT"
}
```

- name：项目名，通常用于发布 npm 包。
- version：版本号，语义化版本（SemVer），比如 1.0.0。
- description：项目描述。
- author：作者信息。
- license：开源协议。

## 依赖管理（Dependencies）

前端项目通常依赖各种库（React、Vue、Axios 等），这些依赖都在 package.json 中声明。

```json
{
  "dependencies": {
    "vue": "^3.3.4",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  },
  "peerDependencies": {}
}
```

- dependencies：生产环境依赖，项目运行时必需。
- devDependencies：开发环境依赖，如打包工具、测试框架、TypeScript。
- peerDependencies 用来声明 你的包需要宿主项目中已经安装的某些依赖，但你自己不直接安装。也就是说，你告诉使用你包的人：“你的项目需要安装这个依赖，我不会帮你安装，但你必须提供它。”

## 脚本命令（Scripts）

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src --fix",
    "test": "vitest run"
  }
}
```

## SemVer（语义化版本）基础

npm 和前端生态几乎都遵循 SemVer（Semantic Versioning）规范，格式为：

```
MAJOR.MINOR.PATCH
<主版本号>.<次版本号>.<补丁版本号>
```

| 部分  | 含义                          | 例子          |
| ----- | ----------------------------- | ------------- |
| MAJOR | 主版本，做了不兼容的 API 修改 | 2.0.0 → 3.0.0 |
| MINOR | 次版本，向下兼容的新功能      | 2.1.0 → 2.2.0 |
| PATCH | 修复向下兼容的 bug            | 2.1.1 → 2.1.2 |

### package.json 中的版本符号

```json
{
  "vue": "^3.3.0",
  "axios": "~1.5.0",
  "lodash": "4.17.21",
  "pinia": ">=2.0.0 <3.0.0"
}
```

### 各符号含义

| 符号              | 说明                                      | 举例                                                |
| ----------------- | ----------------------------------------- | --------------------------------------------------- |
| `^`               | 允许升级 **次版本和补丁**，但不升级主版本 | `^3.3.0` → `3.3.1`、`3.4.0` 都可以，但 `4.0.0` 不行 |
| `~`               | 允许升级 **补丁版本**，不升级次版本       | `~1.5.0` → `1.5.1` 可以，但 `1.6.0` 不行            |
| 无符号            | 精确匹配                                  | `4.17.21` 只安装这个版本                            |
| `>`/`>=`/`<`/`<=` | 范围版本                                  | `>=2.0.0 <3.0.0` → 2.x 都可以                       |
| `*`               | 任意版本                                  | 不推荐，容易出现破坏性更新                          |

## "exports" 字段

这是 Node.js 和现代打包工具（比如 Vite、Webpack、Rollup）支持的包内模块映射机制。它控制了外部使用者在 import 或 require 时，实际访问的文件路径。好处是隐藏内部结构、提供不同环境入口，并明确类型声明。

```json
"exports": {
  ".": {
    "types": "./types/index.d.ts",
    "default": "./dist/node/index.js"
  },
  "./dist/*": "./dist/*",
  "./package.json": "./package.json",
  "./client": {
    "types": "./client.d.ts",
    "default": "./dist/client/index.js"
  },
  "./theme": {
    "types": "./theme.d.ts",
    "default": "./dist/client/theme-default/index.js"
  },
  "./theme-without-fonts": {
    "types": "./theme-without-fonts.d.ts",
    "default": "./dist/client/theme-default/without-fonts.js"
  }
}

```

### 解释：

#### 1."."

代表包的默认入口。

- "types" 指向 TypeScript 类型声明文件（供 TS 用户使用）。
- "default" 指向 Node.js 的默认运行入口（JS 文件）。

#### 2."./dist/\*"

- 允许外部直接访问 dist 目录下的文件，例如 import pkg from 'your-package/dist/foo.js'。

#### 3."./package.json"

- 允许在 ESM 模块中 import pkgJson from 'your-package/package.json'。

#### 4."./client", "./theme", "./theme-without-fonts"

- 为特定子模块提供独立入口。
- 这样做的好处：用户可以只导入你包里的一部分，而不必加载整个包。
- 同样分别指明了 types 和 default JS 文件。

## "main" 和 "types"

```json
"main": "dist/node/index.js",
"types": "types/index.d.ts",
```

- "main"：CommonJS 环境下默认入口文件，老的 Node.js 或打包工具会读取这个字段。
- "types"：TypeScript 的全局类型声明入口，指向 index.d.ts。

> 注：如果 "exports" 存在，现代 Node.js 会优先使用 "exports" 中的入口。

## "bin" 字段

```json
"bin": {
  "xxx": "bin/xxx.js"
}
```

- 这是 CLI 工具的配置。
- 当你全局安装这个包后，会在 PATH 中生成 xxx 命令，执行的是 bin/xxx.js 文件。

## "files" 字段

```json
"files": [
  "bin",
  "dist",
  "types",
  "template",
  "client.d.ts",
  "theme.d.ts",
  "theme-without-fonts.d.ts",
  "lib"
]
```

- 用于 控制 npm 发布时包含哪些文件。
- 发布到 npm 的包只会包含这些路径，其他如 src、测试文件等不会被发布。

明白这些更利于排查错误，例如官方文档中没有进行标注，这时可以查看`node_modules`下的包中的`package.json`，从而进一步排查
