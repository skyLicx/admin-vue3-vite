import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      exclude: ['node_modules']
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js' // 编译模板
      }
    ],
    extensions: ['.ts', '.js']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://xxx.com', // 服务器地址
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
