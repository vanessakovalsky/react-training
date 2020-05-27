const path = require('path');module.exports = {
  entry: {
      main: './client/main.js'
  },
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
      rules: [
          { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader"
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
      ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  }
}