import path from 'path';
import fs from 'fs';
import type { MarkdownRenderer } from 'vitepress';

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?: MarkdownRenderer['renderer']['rules']['container'];
}

const docRoot = path.resolve(__dirname, '../../');
export const createDemoContainer = (md: MarkdownRenderer): ContainerOpts => {
  return {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const sourceFileToken = tokens[idx + 2];
        let source = '';
        const sourceFile = sourceFileToken.children?.[0].content ?? '';

        if (sourceFileToken.type === 'inline') {
          const pathUrl = path.resolve(docRoot, 'examples', `${sourceFile}.vue`);
          source = fs.readFileSync(pathUrl, 'utf-8');
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);

        return `<Demo
                    source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\`\`\``))}"
                    path="${sourceFile}"
                    raw-source="${encodeURIComponent(source)}"
                    description="${encodeURIComponent(md.render(description))}"
                >
                    <template #source><component-${sourceFile.replaceAll('/', '-')}/></template>`;
      } else {
        return '</Demo>\n';
      }
    }
  };
};
