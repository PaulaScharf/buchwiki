var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
	let isProduction = (argv.mode === 'production');
	let config = {
		// entry files to compile (relative to the base dir)
		entry: [
			"./src/index.js",
			"./src/scss/app.scss",
		],
		// path to store compiled JS bundle
		output: {
			// bundle relative name
			filename: "js/app.js",
			// base build directory
			path: path.resolve(__dirname, "dist"),
			// path to build relative asset links
			publicPath: "../"
		},

		module: {
			rules: [
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]'
					}
				},
				// styles loader
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					],
				},
				{
					test: /\.md$/,
					use: [
						{
							loader: "html-loader"
						},
						{
							loader: "markdown-loader",
							options: {
								/* your options here */
							}
						}
					]
				}
			]
		},
		// plugins configurations
		plugins: [
			// provide jQuery and Popper.js dependencies
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				jquery: 'jquery',
				'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default']
			}),
			// save compiled SCSS into separated CSS file
			new MiniCssExtractPlugin({
				filename: "css/style.css"
			})
		]
	};

		// PRODUCTION ONLY configuration
		if (isProduction) {
			config.plugins.push(
				// clean 'dist' directory
				new CleanWebpackPlugin()
			);
		}

	return config;
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
