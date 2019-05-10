const path = require('path'); //引入path
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: {
		index:'./src/js/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	module: {
		rules: [{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'pic'
					},
				}],
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader",
					publicPath:"../"
				})
			},
			{
				test: /\.html$/,
				loader: 'html-withimg-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		new ExtractTextPlugin("style/index.css"),
	]
};