var path = require('path')
var webpack = require('webpack')

module.exports = (env, argv) => {
	let isProduction = (argv.mode === 'production');
	let config = {
		entry: './src/index.js',
		output: {
			// bundle relative name
			filename: "index.js",
			path: path.resolve(__dirname, './dist'),
			publicPath: '/dist/',
			filename: 'build.js'
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
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						'css-loader'
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
