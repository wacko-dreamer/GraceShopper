module.exports = {
<<<<<<< HEAD
    devtool: 'source-map',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    entry: ['babel-polyfill', './src/index.js'],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
};
=======
  devtool: 'source-map',
  output: {
      path: __dirname + '/public',
      filename: 'bundle.js'
  },
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
>>>>>>> a7e4cd0db15c16bd8608e4e5fd94d16c38c71fa0
