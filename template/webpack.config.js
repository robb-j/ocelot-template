// ...

const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = filepath => path.resolve(__dirname, filepath)
const devMode = process.env.NODE_ENV !== 'production'

const postCssLoader = 'postcss-loader'

const extractCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../css'
  }
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [ '@babel/polyfill', resolve('src/app.js') ]
  },
  output: {
    filename: 'app.js',
    path: resolve('assets/js')
  },
  resolve: {
    extensions: [ '.js', '.styl', '.vue', '.css' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ resolve('src') ],
        options: { formatter: require('eslint-friendly-formatter') }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: [
          extractCssLoader,
          'css-loader',
          postCssLoader
        ]
      },
      {
        test: /\.(styl)$/,
        use: [
          devMode ? 'style-loader' : extractCssLoader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '../css/[id].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    })
  ]
}
