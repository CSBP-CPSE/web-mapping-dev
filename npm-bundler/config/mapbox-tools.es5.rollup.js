import babel from 'rollup-plugin-babel';

export default {
    input: '../mapbox-tools/mbtools-es5.js',
    output: {
        file: '../mapbox-tools/mbtools-es5.min.js',
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