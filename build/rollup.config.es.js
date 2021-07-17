import base from './rollup.config.base';

const config = Object.assign({}, base, {
    output: {
        name: 'vue-components',
        file: 'dist/vue-components.js',
        format: 'es'
    }
});

export default config;
