import {defineConfig} from 'vite';
import {createVuePlugin as vue} from 'vite-plugin-vue2';
import svgLoader from 'vite-svg-loader';
import {viteCommonjs} from '@originjs/vite-plugin-commonjs';

const path = require('path');
export default defineConfig({
    plugins: [vue(), svgLoader(), viteCommonjs()],
    resolve: {
        extensions: ['.svg', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "src/scss/_variables.scss";`
            }
        }
    }
});
