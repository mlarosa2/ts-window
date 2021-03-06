const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'ts-window.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ts-window',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};