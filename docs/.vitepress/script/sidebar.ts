import { type DefaultTheme } from 'vitepress';

export const getSidebar = (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: '代码风格与书写规范',
      collapsed: false,
      items: [
        { text: '函数', link: '/content/function' },
        { text: '语言与语法', link: '' },
        { text: '格式化与 lint', link: '' },
        { text: '注释', link: '' },
        { text: '命名', link: '' },
        { text: '模块', link: '' },
        { text: '类型', link: '' }
      ]
    },
    {
      text: '组件开发规范',
      collapsed: false,
      items: []
    },
    {
      text: '状态管理规范',
      collapsed: false,
      items: []
    },
    {
      text: 'API 与数据交互规范',
      collapsed: false,
      items: []
    },
    {
      text: '性能优化规范',
      collapsed: false,
      items: []
    },
    {
      text: '安全与访问控制',
      collapsed: false,
      items: []
    },
    {
      text: '文档与协作规范',
      collapsed: false,
      items: []
    }
  ];
};
