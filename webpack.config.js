//webpack.config.js
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./index.ts",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name]-bundle.js" // <--- Will be compiled to this single file
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()]
  },
};