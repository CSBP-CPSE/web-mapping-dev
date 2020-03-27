import babel from 'rollup-plugin-babel';

export default {
    input: '../odhf-viewer/main.js',
    output: {
        file: '../../web-mapping-prd/odhf-viewer/main.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
			configFile: './config/babel.config.js'
        })
    ]
}