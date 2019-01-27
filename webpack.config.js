const webpack = require('webpack');
const config = {
    entry:  __dirname + '/static/js/index.jsx',
    output: {
        path: __dirname + '/static/dist',
        filename: 'bundle.js',
    },
    resolveLoader: {
        modules: [__dirname + '/static/node_modules'],
    },
    resolve: {
        modules: [__dirname + '/static/node_modules'],
        extensions: ['.js', '.jsx', '.css']
    },
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
