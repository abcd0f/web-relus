import { type DefaultTheme } from 'vitepress';

export const getNav = (): DefaultTheme.NavItem[] => {
  return [
    { text: '快速开始', link: '/content/function' },
    { text: '目的', link: '/aim' }
  ];
};
