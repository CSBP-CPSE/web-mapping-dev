import babel from 'rollup-plugin-babel';

export default {
    input: '../../covid-dev/phac-app-international/application.js',
    output: {
        file: '../../covid-prd/phac-app-international/application.min.js',
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