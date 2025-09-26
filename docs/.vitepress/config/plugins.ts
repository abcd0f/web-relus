import mdContainer from 'markdown-it-container';

import type { MarkdownRenderer } from 'vitepress';

import { createDemoContainer } from './demo';

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(mdContainer, 'demo', createDemoContainer(md));
};
