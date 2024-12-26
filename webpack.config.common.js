// const path = require("path");

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           "style-loader",
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: [["postcss-preset-env"]],
//               },
//             },
//           },
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
//         type: "javascript/auto",
//         loader: "file-loader",
//         options: {
//           publicPath: "../",
//           name: "[path][name].[ext]",
//           context: path.resolve(__dirname, "src/assets"),
//           emitFile: true,
//         },
//       },
//       {
//         test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
//         type: "javascript/auto",
//         exclude: /images/,
//         loader: "file-loader",
//         options: {
//           publicPath: "../",
//           context: path.resolve(__dirname, "src/assets"),
//           name: "[path][name].[ext]",
//           emitFile: true,
//         },
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//   },
// };
