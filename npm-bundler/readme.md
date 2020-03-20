# NPM-Bundler

An npm bundler for my current projects

--------------------------------------------------------------------------------

NPM installation if we need to start over 

--------------------------------------------------------------------------------

1. Install NPM in the project root folder

	npm install

2. Create the package.json file, follow instructions after entering the command

	npm init

3. Install rollup

	npm install rollup --save-dev
	
4. Add the build script to packages.json

	"scripts": {
		"build": "rollup -c"
	}
	
5. Install babel

	npm install @babel/core @babel/preset-env rollup-plugin-babel --save-dev
	
6. Create a .babelrc file in the root folder

	{
	  "presets": [
		  "@babel/env"
	  ]
	}
	
7. Create a rollup.config.js

	import babel from 'rollup-plugin-babel';

	export default {
		input: './src/main.js',
		output: {
			file: './build/bundle.min.js',
			format: 'iife',
			name: 'bundle'
		},
		plugins: [
			babel({
				exclude: 'node_modules/**'
			})
		]
	}