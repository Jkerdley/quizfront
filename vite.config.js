import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	// Эти настройки помогают Vite правильно обрабатывать CommonJS‑модули,
	// чтобы именованный экспорт { thunk } корректно импортировался.
	optimizeDeps: {
		include: ['redux-thunk'],
	},
	commonjsOptions: {
		requireReturnsDefault: 'auto',
	},
});
