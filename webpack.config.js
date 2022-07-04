let path = require("path");

module.exports = {
  mode: 'development',
  entry: "./js/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  devtool: 'source-map',
  // module: {
  //   rulse: [
  //     {
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: 'babel-loader',
  //     }
  //     }
  //   ]
  // }
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};
