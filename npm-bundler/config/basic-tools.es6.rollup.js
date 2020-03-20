import babel from 'rollup-plugin-babel';

export default {
    input: '../basic-tools/btools-es5.js',
    output: {
        file: '../basic-tools/btools-es6.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: []
}