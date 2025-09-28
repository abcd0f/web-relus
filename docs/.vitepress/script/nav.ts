import { type DefaultTheme } from 'vitepress';

export const getNav = (): DefaultTheme.NavItem[] => {
  return [
    { text: '快速开始', link: '/content/vue' },
    { text: '目的', link: '/aim' },
    {
      text: '资源站',
      items: [
        { text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/' },
        {
          text: 'TS练习',
          link: 'https://github.com/type-challenges/type-challenges'
        },
        // {
        //   text: 'LeetCode',
        //   link: 'https://leetcode.cn/problemset/'
        // },
        {
          text: 'CSS 游戏',
          link: '/content/css-battle'
        }
      ]
    }
  ];
};
