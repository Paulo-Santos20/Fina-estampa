import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Usar esbuild ao invés de terser (mais rápido)
    minify: 'esbuild',
    // Otimizações para produção
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons']
        }
      }
    },
    // Configurações de build
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  // Otimizações de desenvolvimento
  server: {
    port: 5173,
    host: true
  },
  // Resolver aliases para imports mais limpos
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@data': '/src/data',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils'
    }
  },
  // Configurações CSS
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})