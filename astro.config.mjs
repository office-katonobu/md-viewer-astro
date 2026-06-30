import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'; // インポートを追加

export default defineConfig({
  vite: {
    plugins: [tailwindcss()], // Viteのプラグインとして登録
  },
});
