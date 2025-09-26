// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import type { Theme } from 'vitepress';
import Demo from '../components/demo.vue';
import { defineAsyncComponent } from 'vue';

import './style.css';

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Demo);

    const componentPaths = (import.meta as any).glob('../../examples/**/*.vue');

    Object.keys(componentPaths).forEach(path => {
      const relativePath = path.replace('../../examples/', '').replace('.vue', '');
      const componentName = `component-${relativePath.replace(/\//g, '-')}`;

      // 异步注册组件
      app.component(
        componentName,
        defineAsyncComponent(() => componentPaths[path]())
      );
    });
    // ...
  }
} satisfies Theme;
