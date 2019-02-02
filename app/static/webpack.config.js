const webpack = require('webpack');
const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolveLoader: {
        modules: [__dirname + '/node_modules'],
    },
    resolve: {
        modules: [__dirname + '/node_modules'],
        extensions: ['.js', '.jsx', '.css']
    },
    devtool: '#eval-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            }
          ]
        }
    ]
  }
};
module.exports = config;
