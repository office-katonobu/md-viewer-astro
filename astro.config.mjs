import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { visit } from 'unist-util-visit'; // 名前付きインポート
import { unified } from '@astrojs/markdown-remark'; // Astro 7互換用エンジン

// Markdown内の「.md」への相対リンクを、Web用のURL構造に自動変換するカスタムプラグイン
function remarkFixMarkdownLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      // 外部リンク（httpから始まるもの）を除外し、末尾が .md のリンクを対象にする
      if (!node.url.startsWith('http') && node.url.endsWith('.md')) {
        // /index.md はスラッシュごと消し、それ以外の .md も綺麗に消去する
        node.url = node.url.replace(/\/index\.md$/, '').replace(/\.md$/, '');
      }
    });
  };
}

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // Astro 7の新エンジン上で従来のプラグインを動作させるための最新の記述方法
    legacy: unified({
      remarkPlugins: [remarkFixMarkdownLinks],
    })
  }
});
