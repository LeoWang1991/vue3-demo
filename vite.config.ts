import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'

import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'

import VueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

import AutoImport from 'unplugin-auto-import/vite'
import setting from './src/settings'

const prodMock = setting.openProdMock

export default ({ command, mode }: any) => {
  return {
    base: setting.viteBasePath,
    define: {
      'process.platform': null,
      'process.version': null,
      GLOBAL_STRING: JSON.stringify('i am global var from vite.config.js define'),
      GLOBAL_VAR: {
        test: 'i am global var from vite.config.js define'
      },
    },
    cleanScreen: false,
    server: {
      hmr: {
        overlay: false
      },
      port: 5003,
      open: false,
      cors: true,
      proxy: {}
    },
    preview: {
      port: 5003,
      host: '0.0.0.0',
      strictPort: true
    },
    plugins: [
      vue(),
      vueJsx(),
      // 为了传统浏览器提供esm的功能
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      viteSvgIcons({
        iconDirs: [
          path.resolve(process.cwd(), 'src/icons/common'),
          path.resolve(process.cwd(), 'src/icons/nav-bar')
        ],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: prodMock,
        injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
        `,
        logger: true
      }),
      // https://juejin.cn/post/7056639897561464845
      VueSetupExtend(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'pinia',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/useElement': ['useElement'],
            '@/hooks/global/useVueRouter': ['useVueRouter'],
            '@/utils/axiosReq': ['axiosReq']
          }
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: true
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: setting.title
          }
        }
      })
    ],
    build: {
      minify: 'terser',
      brotliSize: false,
      chunkSizeWarningLimit: 5000,
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: [
            'console.log',
            'console.info'
          ],
          drop_debugger: true
        }
      },
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      postcss: [
        {
          postcssPlugin: 'internal: charset-removal',
          AtRule: {
            charset: atRule => {
              if(atRule.name === 'charset') {
                atRule.remove()
              }
            }
          }
        }
      ],
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss"`
        }
      }
    },
    optimizeDeps: {
      include: ['moment-mini']
    }
  }
}