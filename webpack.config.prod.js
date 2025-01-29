const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // For minification

module.exports = {
  mode: "production", // Set to production mode
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "js/[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Ensure this is correct for your deployment environment
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      // ... (your existing rules for JS/JSX, CSS, images)
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use MiniCssExtractPlugin in production
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()], // Use TerserPlugin for minification
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // Add content hash
    }),
    new CleanWebpackPlugin(),
  ],
};
