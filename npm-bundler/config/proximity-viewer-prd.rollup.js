import babel from 'rollup-plugin-babel';

export default {
    input: '../lode-viewer/main.js',
    output: {
        file: '../../proximity-viewer-prd/main.min.js',
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