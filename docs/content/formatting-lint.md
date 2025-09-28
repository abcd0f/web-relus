# 格式化与 Lint 规范

## 概述

代码格式化和 Lint 工具是保证代码质量和一致性的重要手段。本规范定义了项目中使用的格式化工具配置、Lint 规则以及相关的工作流程。

## 工具链选择

### 核心工具

- **Prettier**: 代码格式化
- **ESLint**: JavaScript/TypeScript 代码质量检查
- **StyleLint**: CSS/SCSS 样式代码检查
- **lint-staged**: Git 提交前检查`(SVN 用不到)`
- **husky**: Git hooks 管理`(SVN 用不到)`

## Prettier 配置

官方文档[直达](https://prettier.io/docs/)

#### 配置参考

- [Prettier Options](https://prettier.io/docs/options#tab-width)

### 基础配置

```json
// .prettierrc
{
  "printWidth": 80, // 每行的最大长度，超过后换行。常见值：80 / 100 / 120
  "tabWidth": 2, // 缩进空格数，前端推荐 2
  "useTabs": false, // 用空格缩进而不是 tab
  "semi": true, // 每行结尾加分号
  "singleQuote": true, // 使用单引号代替双引号
  "proseWrap": "never", // 控制 Markdown 或其他富文本（比如 .md 文件）中段落的换行行为,永远不自动换行
  "arrowParens": "avoid", // 箭头函数单个参数时省略括号 (x => x)
  "bracketSpacing": true, // 对象字面量大括号内保留空格 { foo: bar }
  "htmlWhitespaceSensitivity": "ignore", // 忽略 HTML 的空格敏感度，减少换行/空格问题
  "ignorePath": ".prettierignore", // 指定忽略文件列表
  "jsxSingleQuote": false, // jsx 里仍使用双引号 <div className="x">
  "requireConfig": false, // 不强制要求必须有配置文件才运行 prettier
  "endOfLine": "auto", // 根据当前操作系统自动选择换行符
  "trailingComma": "all" // 所有可能的地方都加尾随逗号，包括对象、数组和函数参数
}
```

#### 插件推荐

- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#readme)

### 忽略文件配置

```bash
# .prettierignore
dist
dev-dist
.local
.output.js
node_modules
.nvmrc
coverage
CODEOWNERS
.nitro
.output


**/*.svg
**/*.sh

public
.npmrc
*-lock.yaml
```

### 文件类型特定配置

```json
// .prettierrc
{
  "semi": true, // 每句代码结尾加分号
  "singleQuote": true, // 使用单引号而不是双引号
  "printWidth": 80, // 每行最大宽度 80 个字符，超出则换行
  "tabWidth": 2, // 一个 tab 等于 2 个空格
  "overrides": [
    // 针对特定文件类型的覆盖配置
    {
      "files": "*.md", // 作用于所有 Markdown 文件
      "options": {
        "printWidth": 100, // Markdown 文件宽度放宽到 100
        "proseWrap": "always" // Markdown 中文本过长时强制换行
      }
    },
    {
      "files": "*.json", // 作用于所有 JSON 文件
      "options": {
        "printWidth": 120 // JSON 文件宽度放宽到 120
      }
    },
    {
      "files": ["*.json5"],
      "options": {
        "quoteProps": "preserve", // JSON5 文件保留属性名
        "singleQuote": false // JSON5 文件使用双引号
      }
    },
    {
      "files": ["*.css", "*.scss", "*.less"], // 作用于样式文件
      "options": {
        "singleQuote": false // 样式文件中使用双引号（符合 CSS 规范）
      }
    },
    {
      "files": "*.vue", // 作用于 Vue 单文件组件
      "options": {
        "htmlWhitespaceSensitivity": "ignore" // 忽略 HTML 的空格敏感性，更适合 Vue 模板格式化
      }
    }
  ]
}
```

> 请在编辑器中安装 `Prettier` 插件,并将其设置为默认格式化程序,不安装,请在代码提交前 执行 `pnpm format` 命令

## ESLint 配置

什么是 ESLint？

ESLint 是一个 JavaScript/TypeScript 代码质量和风格检查工具，主要作用是：

- 保持代码风格一致（比如单双引号、缩进方式）。
- 避免低级错误（比如未定义变量、未使用的变量、未处理的 await）。
- 提供团队协作规范，减少 PR review 成本。

### 基础配置

本配置展示了 ESLint 的核心基础规则，完全不使用任何插件。无论项目中使用何种插件，都应加入这些基本配置，确保代码风格和质量的一致性。

官方文档[直达](https://eslint.org/docs/latest/)

```js
// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';

// 使用 defineConfig 定义 ESLint 配置，支持类型提示
export default defineConfig([
  // 全局忽略某些文件或目录（根据项目情况自行配置）
  globalIgnores(['**/.*', 'dist/*', '*.d.ts', 'public/*', 'src/assets/**']),
  {
    // 不指定 files，则默认作用于所有文件
    rules: {
      // 强制缩进为 2 个空格
      indent: ['error', 2],
      // 禁止使用未定义变量
      'no-undef': 'error',
      // 禁止未使用的变量（对 JS/TS 有效）
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // 禁止重复导入
      'import/no-duplicates': 'error',
      // 禁止使用 console（生产环境可改为 warn 或 off）
      'no-console': 'warn'
    }
  },
  {
    // 针对 TypeScript 类型声明文件
    files: ['**/*.d.ts'],
    rules: {
      // 允许在类型文件中无限制地禁用 ESLint
      'eslint-comments/no-unlimited-disable': 'off',
      // 允许重复导入类型
      'import/no-duplicates': 'off',
      // 关闭对某些语法的限制
      'no-restricted-syntax': 'off',
      // 类型文件中未使用的导入不报错
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    // 针对 JavaScript 文件，包括 .js、.cjs、.mjs
    files: ['**/*.?([cm])js'],
    rules: {
      // 允许在 JS 文件中使用 require 导入
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  {
    // 针对 Vue 单文件组件
    files: ['**/*.vue'],
    rules: {
      // 关闭模板中未定义变量报错（Vue 的响应式变量）
      'no-undef': 'off',
      // 关闭未使用变量报错
      'no-unused-vars': 'off',
      // 允许使用 v-html 指令
      'vue/no-v-html': 'off',
      // props 不强制默认值
      'vue/require-default-prop': 'off',
      // 不强制声明 emits
      'vue/require-explicit-emits': 'off',
      // 允许单词名组件，如 Button.vue
      'vue/multi-word-component-names': 'off',
      // setup 中操作 props 不报错
      'vue/no-setup-props-reactivity-loss': 'off',
      // HTML、SVG、MathML 标签强制自闭合
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // 空标签必须自闭合，如 <br />
            normal: 'always', // 普通标签必须自闭合，如 <div />
            component: 'always' // 组件标签必须自闭合，如 <MyComp />
          },
          svg: 'always', // SVG 标签自闭合
          math: 'always' // MathML 标签自闭合
        }
      ]
    }
  }
]);
```

#### 插件推荐

- [typescript-eslint](https://typescript-eslint.io/packages/typescript-eslint/)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [vue-eslint-parser](https://github.com/vuejs/vue-eslint-parser#readme)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier#readme)
- [globals](https://github.com/sindresorhus/globals#readme)

## 故障排除

### 常见问题

1. **Prettier 和 ESLint 冲突**

   - 确保安装 `eslint-config-prettier`
   - 将 `prettier` 放在 extends 数组的最后

## 总结

格式化和 Lint 工具的正确配置和使用能够：

- **提高代码质量**: 及早发现潜在问题
- **保持一致性**: 统一团队的代码风格
- **提升效率**: 自动化代码格式化和错误检查
- **减少争议**: 用工具而非人工判断代码风格

建议团队定期审查和更新这些配置，以适应新的最佳实践和团队需求的变化。
