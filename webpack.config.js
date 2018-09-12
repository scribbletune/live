const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		bundle: './src/index.js'
	},
	mode: 'production',
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
	node: {
		fs: 'empty'
	}
};
