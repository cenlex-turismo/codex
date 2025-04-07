import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact()],
    css: {
        postcss: './postcss.config.js',
    },
    server: {
        port: 3001
    }
});