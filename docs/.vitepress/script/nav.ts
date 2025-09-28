import { type DefaultTheme } from 'vitepress';

export const getNav = (): DefaultTheme.NavItem[] => {
  return [
    { text: '快速开始', link: '/content/function' },
    { text: '目的', link: '/aim' },
    {
      text: '资源站',
      items: [
        {
          text: 'TS练习',
          link: 'https://github.com/type-challenges/type-challenges'
        },
        {
          text: 'LeetCode',
          link: 'https://leetcode.cn/problemset/'
        },
      ]
    }
  ];
};
