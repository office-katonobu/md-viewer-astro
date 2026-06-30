import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 環境変数 BASE_PATH があればそれを、なければデフォルトで '/' を使用
  base: process.env.BASE_PATH || '/',  
  vite: {
    plugins: [tailwindcss()],
  },
  // 複雑なレガシー設定とカスタムプラグインを削除
});