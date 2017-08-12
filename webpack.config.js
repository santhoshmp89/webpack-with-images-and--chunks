var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/app.js',
		contact: './src/contact.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 9000,
		open: true
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
		         test: /\.(png|svg|jpg|gif)$/,
		         use: [
		           'file-loader'
		         ]
	       }
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack ES6',		
			excludeChunks: ['contact'],
	    	template: './src/index.html',
		}),
		new HtmlWebpackPlugin({
			title: 'Contact Page',
			filename: 'contact.html',
			chunks: ['contact'],
	    	template: './src/contact.html',
		}),
		new webpack.optimize.CommonsChunkPlugin({name: "commons", filename: "commons.js"}),
		new ExtractTextPlugin('[name].css')
		]
}