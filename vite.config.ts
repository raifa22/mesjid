import { defineConfig } from 'vite';

export default defineConfig({
  // Base './' memastikan semua aset (JS, CSS, Image) menggunakan path relatif 
  // sehingga aplikasi tidak blank saat diakses di sub-direktori GitHub Pages.
  base: './', 
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
  }
});