-only / webpack.config.production.js;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  outputConfig,
  copyPluginPatterns,
  scssConfig,
  entryConfig,
  terserPluginConfig,
} = require("./env.config");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");

module.exports = merge(common, {
  mode: "production",
  entry: entryConfig,
  output: {
    path: path.resolve(__dirname, outputConfig.destPath),
    filename: "js/[name].[contenthash].js",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserPluginConfig)],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "../",
          name: "[path][name].[ext]",
          context: path.resolve(__dirname, "src/assets"),
          emitFile: true,
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        type: "javascript/auto",
        exclude: /images/,
        loader: "file-loader",
        options: {
          publicPath: "../",
          context: path.resolve(__dirname, "src/assets"),
          name: "[path][name].[ext]",
          emitFile: true,
        },
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin(copyPluginPatterns),
    new MiniCssExtractPlugin({ filename: scssConfig.destFileName }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      minify: false,
    }),
  ],
});
