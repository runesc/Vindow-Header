const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss)$/,
        use: [{
				  // inject CSS to page
				  loader: 'style-loader'
        }, {
				  // translates CSS into CommonJS modules
				  loader: 'css-loader'
        }, {
				  // Run postcss actions
				  loader: 'postcss-loader',
				  options: {
            // `postcssOptions` is needed for postcss 8.x;
            // if you use postcss 7.x skip the key
            postcssOptions: {
					  // postcss plugins, can be exported to postcss.config.js
					  plugins () {
                // eslint-disable-next-line global-require
                return [require('autoprefixer')];
					  }
            }
				  }
        }, {
				  // compiles Sass to CSS
				  loader: 'sass-loader'
        }]
			  },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})