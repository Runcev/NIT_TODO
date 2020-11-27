const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src_react/main.js"
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
    publicPath: '/', //relative path to output path where  devserver will look for compiled files,
    hot: true
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'public/calendar'), // base path where to send compiled assets
    publicPath: '/' // base path where referenced files will be look for
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src_react') // shortcut to reference src folder from anywhere
    }
  },
  module: {
    rules: [
      { // config for es6 jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { // config for sass compilation
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["css/*.*", "js/*.*"]
    }),
    new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};