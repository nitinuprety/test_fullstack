const webpack = require("webpack");

module.exports = {
  entry: [
    './src/index.js'
  ],
  vendor: [
        'xlsx',
        'file-saver'
],
node: {fs: 'empty'},
externals: [
    {'./cptable': 'var cptable'},
    {'./jszip': 'jszip'}
 ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  node: {
  fs: 'empty'
},
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }

};
