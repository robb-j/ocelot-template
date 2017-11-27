// ...

const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(filepath) {
  return path.resolve(__dirname, filepath)
}

module.exports = {
  entry: [ 'babel-polyfill', resolve('src/app.js') ],
  output: {
    filename: 'app.js',
    path: resolve('assets/js')
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ resolve('src') ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ resolve('src') ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!stylus-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.styl', '.vue', '.css' ]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('../css/styles.css'),
    new UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    })
  ]
}
