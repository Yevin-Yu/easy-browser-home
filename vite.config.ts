import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/nav/',
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({ 
      // 应用清单
      manifest: {
        name: '耶温导航',
        short_name: '导航',
        description: '耶温导航-搜索、收藏网站、备忘录、待办',
        theme_color: '#ccc',
        icons: [
          {
            src: 'app.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // 注册ws方式
      injectRegister: 'auto',
      // 设置缓存资源
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,jpg,jpeg}']
      },
      //dev环境也开启pwa
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
