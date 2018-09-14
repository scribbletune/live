const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: 'bundle.js',
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
