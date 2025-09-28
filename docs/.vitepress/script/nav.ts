import { type DefaultTheme } from 'vitepress';

export const getNav = (): DefaultTheme.NavItem[] => {
  return [
    { text: '快速开始', link: '/content/vue' },
    { text: '目的', link: '/aim' },
    {
      text: '资源站',
      items: [
        { text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/' },
        // {
        //   text: 'LeetCode',
        //   link: 'https://leetcode.cn/problemset/'
        // },
        {
          text: 'CSS 布局',
          link: '/content/css-battle'
        }
      ]
    }
  ];
};
