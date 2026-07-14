import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 環境変数 BASE_PATH があればそれを、なければデフォルトで '/' を使用
  base: process.env.BASE_PATH || '/',  
  // 開発ツールバーを無効化する設定
  devToolbar: {
    enabled: false,
  },  
  vite: {
    plugins: [tailwindcss()],
		server: {
			watch: {
				usePolling: true,
			},
		},
  },
});