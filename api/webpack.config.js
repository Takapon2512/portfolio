// webpack.config.js

const path = require('path');

module.exports = {
  target: 'node',
  entry: './server.ts', // エントリーポイントファイルのパス
  output: {
    filename: 'index.js', // 出力ファイル名
    path: path.resolve(__dirname, 'dist'), // 出力ディレクトリのパス
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
