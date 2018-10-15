const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		bundle: './src/modules/Live/index.js',
		example: './src/example.js',
		sequencer: './src/modules/Sequencer/index.js',
		detect: './src/modules/DetectScales/index.js',
		rpg8: './src/modules/rpg8/index.js'
	},
	mode: 'development',
	output: {
		filename: '[name].js',
		// Use `docs` for the output for Github pages
		path: path.resolve(__dirname, 'docs')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		contentBase: path.join(__dirname, 'docs'),
		watchContentBase: true,
		compress: true,
		port: 3000
	},
	performance: {
		hints: false
	},
	node: {
		fs: 'empty'
	}
};
