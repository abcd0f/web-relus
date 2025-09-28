# 代码组织结构规范

## 概述

良好的代码组织结构是项目可维护性和团队协作效率的基础。本规范定义了项目的文件夹结构、文件命名、模块组织等标准，旨在提高代码的可读性、可扩展性和团队开发效率。

## 基本原则

### 核心理念

1. **功能导向**: 按功能模块组织代码，而非技术层次
2. **就近原则**: 相关的代码文件应该放在邻近的位置
3. **清晰命名**: 文件和文件夹名称应该清晰地表达其用途
4. **层次分明**: 建立清晰的层级结构，避免过深的嵌套
5. **职责单一**: 每个文件和模块都有明确的职责边界

## 项目根目录结构

```
project-root/
├── public/                     # 静态资源
│   ├── icons/                  # 图标文件
│   ├── images/                 # 图片资源
│   └── favicon.ico             # 网站图标
├── build/                      # 打包插件，优化等工具配置
├── src/                        # 源代码目录
├── types/                      # 全局类型定义
├── tests/                      # 测试文件
├── scripts/                    # 构建和部署脚本
├── .browserslistrc             # 浏览器兼容性配置
├── .npmrc/                     # npm 配置
├── .node-version               # node 版本
├── .env.example                # 环境变量示例
├── .gitignore                  # Git 忽略文件
├── .eslintrc.js                # ESLint 配置
├── .prettierrc                 # Prettier 配置
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # 构建工具配置
├── package.json                # 依赖和脚本
└── README.md                   # 项目说明
```

## 源码目录结构（src/）

### 1. 功能模块组织

```
src/
├── api/                        # API 接口层
├── assets/                     # 静态资源
│   ├── fonts/                  # 字体文件
│   ├── icons/                  # SVG 图标
│   ├── images/                 # 图片资源
│   └── styles/                 # 样式文件
├── config/                     # 配置文件
├── components/                 # 通用组件
├── composables/                # 组合式函数
│   ├── core/                   # 核心 composables
│   │   ├── useAuth.ts          # 认证逻辑
│   │   ├── usePermission.ts    # 权限逻辑
│   │   └── useTheme.ts         # 主题逻辑
├── constants/                  # 常量定义
│   ├── api.ts                  # API 相关常量
│   ├── app.ts                  # 应用常量
│   ├── business.ts             # 业务常量
│   └── index.ts                # 常量导出
├── directives/                 # 自定义指令
│   ├── permission.ts           # 权限指令
│   ├── loading.ts              # 加载指令
│   └── index.ts                # 指令导出
├── layouts/                    # 页面布局
│   ├── DefaultLayout.vue       # 默认布局
│   ├── AuthLayout.vue          # 认证布局
│   └── AdminLayout.vue         # 管理后台布局
├── pages/                      # 页面组件
│   ├── auth/                   # 认证相关页面
│   │   ├── login/              # 登录页面
│   │   │   ├── index.vue       # 页面主文件
│   │   │   ├── components/     # 页面专用组件
│   │   │   └── composables/    # 页面专用逻辑
│   │   └── register/           # 注册页面
│   ├── dashboard/              # 仪表板页面
│   ├── user/                   # 用户管理页面
│   │   ├── list/               # 用户列表
│   │   ├── detail/             # 用户详情
│   │   └── profile/            # 用户配置
│   └── error/                  # 错误页面
│       ├── 404.vue             # 404 页面
│       └── 500.vue             # 500 页面
├── plugins/                    # 插件配置
│   ├── router.ts               # 路由配置
│   ├── pinia.ts                # 状态管理
│   ├── i18n.ts                 # 国际化
│   └── index.ts                # 插件导出
├── router/                     # 路由配置
│   ├── modules/                # 路由模块
│   │   ├── auth.ts             # 认证路由
│   │   ├── user.ts             # 用户路由
│   │   └── admin.ts            # 管理路由
│   ├── guards/                 # 路由守卫
│   │   ├── auth.ts             # 认证守卫
│   │   └── permission.ts       # 权限守卫
│   └── index.ts                # 路由主文件
├── stores/                     # 状态管理
│   ├── modules/                # 状态模块
│   │   ├── auth.ts             # 认证状态
│   │   ├── user.ts             # 用户状态
│   │   └── app.ts              # 应用状态
│   ├── types/                  # 状态类型
│   └── index.ts                # Store 导出
├── utils/                      # 工具函数
│   ├── auth.ts                 # 认证工具
│   ├── date.ts                 # 日期处理
│   ├── format.ts               # 格式化工具
│   ├── validation.ts           # 验证工具
│   ├── storage.ts              # 存储工具
│   └── index.ts                # 工具导出
├── App.vue                     # 根组件
└── main.ts                     # 应用入口
```

### 2. 组件结构规范

#### 基础组件结构

```
components/base/Button/
├── index.ts                   # 导出组件或全局注册组件等逻辑
└── src
    ├── index.vue              # 主组件文件
    ├── styles.scss            # 组件样式
    └── types.ts               # 组件类型定义
```

## 文件命名规范

### 1. 文件名格式

```
✅ 正确的文件命名

# 组件文件 - PascalCase
UserProfile.vue
ProductCard.vue
OrderSummary.vue

# 页面文件 - kebab-case
user-profile.vue
product-list.vue
order-detail.vue

# 工具函数 - camelCase
userUtils.ts
dateHelper.ts
apiClient.ts

# 类型定义 - camelCase
userTypes.ts
apiTypes.ts
commonTypes.ts

# 常量文件 - camelCase
appConstants.ts
apiConstants.ts
businessRules.ts

# 样式文件 - kebab-case
user-profile.scss
common-variables.scss
base-components.scss

❌ 错误的文件命名

# 避免使用
User_Profile.vue           # 下划线分隔
userprofile.vue           # 全小写无分隔
User Profile.vue          # 空格分隔
userProfile.Vue           # 扩展名大小写不统一
```

### 2. 目录命名规范

```
✅ 正确的目录命名

# 功能模块目录 - kebab-case
lay-header/
lay-main/
lay-footer/

# 组件目录 - PascalCase
UserCard/
ProductList/
OrderSummary/

# 工具目录 - camelCase
utils/
helpers/
services/

❌ 错误的目录命名

# 避免使用
User_Management/          # 下划线分隔
userManagement/          # camelCase 用于功能目录
user management/         # 空格分隔
```

## 代码分层架构

### 1. 分层结构

```
┌─────────────────┐
│   Presentation  │  <- pages/, components/
│     Layer       │     (页面和组件)
├─────────────────┤
│   Business      │  <- composables/, stores/
│     Logic       │     (业务逻辑)
├─────────────────┤
│   Data Access   │  <- api/, services/
│     Layer       │     (数据访问)
├─────────────────┤
│   Utilities     │  <- utils/, helpers/
│     Layer       │     (工具函数)
└─────────────────┘
```

## 配置文件组织

### 1. 环境配置

现代项目多数基于`vite`进行开发，因此借助`import.meta.env`可以轻松实现环境配置。

```bash
.env                # 全局环境变量
.env.development    # 开发环境变量
.env.production     # 生产环境变量
```

没有使用`vite`等工具的情况下,若项目中需要配置环境变量，自行配置，合理即可
