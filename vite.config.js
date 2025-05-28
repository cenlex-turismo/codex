import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import Sitemap from 'vite-plugin-sitemap'


export default defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact(),
    Sitemap({
        hostname: 'https://codex.celexest.com', // Your site's URL
        outDir: './dist', // The output directory for the sitemap
    }),],
    css: {
        postcss: './postcss.config.js',
    },
    server: {
        port: 3001,
        allowedHosts: ["codex.celexest.com"]
    }
});