import path from 'path';
import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/utils';
import ExtractTextPlugin from "extract-text-webpack-plugin";
export default {
  entry: {
    app: './src/client',
    lib: './src/libs/js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: 'style-loader!css-loader',
        include: [path.resolve(__dirname, './src/client/')],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
        include: [path.resolve(__dirname, './src/libs/')]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ],
        include: [path.resolve(__dirname, './src/libs/')]
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin("bootstrap.css")
  ],
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT
  }
};
