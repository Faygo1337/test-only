// const path = require("path");

// const outputConfig = {
//   destPath: "./dist",
// };

// // Entry points
// const entryConfig = ["./src/Main.tsx", "./src/assets/stylesheets/app.scss"];

// // Copy files from src to dist
// const copyPluginPatterns = {
//   patterns: [
//     // { from: "./src/assets/images", to: "images" },
//     // { from: "./src/assets/fonts", to: "fonts" },
//     { from: "./src/assets/vendor", to: "js" },
//   ],
// };

// // Dev server setup
// const devServer = {
//   static: {
//     directory: path.join(__dirname, outputConfig.destPath),
//   },
// };

// // SCSS compile
// const scssConfig = {
//   destFileName: "css/app.min.css",
// };

// // Production terser config options
// const terserPluginConfig = {
//   extractComments: false,
//   terserOptions: {
//     compress: {
//       drop_console: true,
//     },
//   },
// };

// module.exports.copyPluginPatterns = copyPluginPatterns;
// module.exports.entryConfig = entryConfig;
// module.exports.scssConfig = scssConfig;
// module.exports.devServer = devServer;
// module.exports.terserPluginConfig = terserPluginConfig;
// module.exports.outputConfig = outputConfig;
