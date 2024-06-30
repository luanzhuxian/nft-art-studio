import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';

const createProxy = (): ProxyOptions => {
  const proxyJsonPath = path.resolve(__dirname + '/.proxy.json');
  if (!fs.existsSync(proxyJsonPath)) {
    return;
  }
  const proxyJson = JSON.parse(fs.readFileSync(proxyJsonPath, 'utf-8'));
  return {
    target: proxyJson.target,
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api/, ''),
    configure: (proxy, options) => {
      proxy.on('proxyReq', (proxyReq, req, res) => {});
      proxy.on('proxyRes', (proxyRes, req, res) => {
        console.log(
          `Proxying request from ${req.url} to ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`,
        );
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd());
  const IS_DEV = mode === 'development';
  const IS_PROD = mode === 'production';

  return {
    css: {
      modules: {
        scopeBehaviour: 'local',
        generateScopedName: '[name]_[local]__[hash:base64:5]',
      },
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
      },
    },
    server: IS_DEV && {
      port: Number(VITE_PORT),
      proxy: {
        '/api': createProxy(),
      },
    },
    plugins: [react()],
  };
});
