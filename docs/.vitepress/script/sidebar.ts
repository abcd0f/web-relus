import { type DefaultTheme } from 'vitepress';

const addBadgeHTML = (text: string = '⭐') => {
  return `<div id="docs-badge">${text}</div>`;
};

export const getSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: '代码风格与书写规范',
      collapsed: false,
      items: [
        { text: 'VUE' + addBadgeHTML(), link: '/content/vue' },
        { text: '格式化与 Lint' + addBadgeHTML(), link: '/content/formatting-lint' },
        { text: '导入导出规范', link: '/content/import-export' },
        { text: '函数', link: '/content/function' },
        { text: '语言与语法', link: '/content/language-syntax' },
        { text: '注释' + addBadgeHTML(), link: '/content/comments' },
        { text: '命名', link: '/content/naming' },
        { text: '类型', link: '/content/types' },
        { text: '代码组织结构', link: '/content/code-structure' },
        { text: 'package.json', link: '/content/package-json' }
      ]
    },
    {
      text: '组件开发规范',
      collapsed: false,
      items: [
        { text: '组件设计原则', link: '/content/component-design' },
        { text: 'Props 定义规范', link: '/content/props-standards' },
        { text: '组件复用策略', link: '/content/component-reuse' }
      ]
    },
    // {
    //   text: '状态管理规范',
    //   collapsed: false,
    //   items: [
    //     { text: '状态设计原则', link: '/content/state-design' },
    //     { text: '全局状态管理', link: '/content/global-state' },
    //     { text: '局部状态管理', link: '/content/local-state' },
    //     { text: '状态更新规范', link: '/content/state-updates' }
    //   ]
    // },
    // {
    //   text: 'API 与数据交互规范',
    //   collapsed: false,
    //   items: [
    //     { text: '接口设计规范', link: '/content/api-design' },
    //     { text: '请求响应处理', link: '/content/request-response' },
    //     { text: '数据验证规范', link: '/content/data-validation' },
    //     { text: '缓存策略', link: '/content/caching-strategy' },
    //     { text: '错误处理', link: '/content/api-error-handling' }
    //   ]
    // },
    // {
    //   text: '性能优化规范',
    //   collapsed: false,
    //   items: [
    //     { text: '代码层面优化', link: '/content/code-optimization' },
    //     { text: '资源加载优化', link: '/content/resource-loading' },
    //     { text: '渲染性能优化', link: '/content/render-optimization' },
    //     { text: '内存管理', link: '/content/memory-management' },
    //     { text: '打包优化', link: '/content/bundle-optimization' }
    //   ]
    // },
    // {
    //   text: '安全与访问控制',
    //   collapsed: false,
    //   items: []
    // },
    {
      text: '文档与协作规范',
      collapsed: false,
      items: [
        { text: '阅读文档', link: '/content/read-docs' },
        { text: 'README 编写规范', link: '/content/readme-standards' },
        { text: 'Git/SVN 提交规范', link: '/content/git-commit' }
      ]
    },
    {
      text: '别人怎样做的',
      collapsed: false,
      items: [
        { text: '阿里', link: 'https://alibaba.github.io/f2e-spec/zh/' },
        { text: '腾讯', link: 'https://tgideas.qq.com/doc/frontend/spec/common/' },
        { text: '京东凹凸实验室', link: 'https://guide.aotu.io/index.html' }
      ]
    }
  ];
};
