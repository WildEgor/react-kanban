const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const getFilesFromDir = require("../config/files");
const PAGE_DIR = Path.join("src", "pages", Path.sep);

const htmlPlugins = getFilesFromDir(PAGE_DIR, [".html"]).map( filePath => {
  const fileName = filePath.replace(PAGE_DIR, "");
  // { chunks:["contact", "vendor"], template: "src/pages/contact.html",  filename: "contact.html"}
  return new HtmlWebpackPlugin({
    inject: true,
    chunks:[fileName.replace(Path.extname(fileName), ""), "vendor"],
    template: filePath,
    filename: fileName
  })
});

const entry = getFilesFromDir(PAGE_DIR, [".js"]).reduce( (obj, filePath) => {
  const entryChunkName = filePath.replace(Path.extname(filePath), "").replace(PAGE_DIR, "");
  obj[entryChunkName] = `./${filePath}`;
  return obj;
}, {});

module.exports = {
  entry: entry,
  output: {
    path: Path.join(__dirname, '../build'),
    filename: '[name].[hash:4].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: false,
      minSize: 150000,
      minRemainingSize: 0,
      maxSize: 200000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 180000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: Path.resolve(__dirname, '../static'), to: 'static' }],
    }),
    ...htmlPlugins,
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    modules: [Path.resolve(__dirname, '../src'), Path.resolve(__dirname, '../node_modules')],
    alias: {
      Style: Path.resolve(__dirname, '../src/style/'),
      Store: Path.resolve(__dirname, '../src/store/'),
      Pages: Path.resolve(__dirname, '../src/pages/'),
      Hooks: Path.resolve(__dirname, '../src/hooks/'),
      Components: Path.resolve(__dirname, '../src/components/'),
      Utils: Path.resolve(__dirname, '../src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
};
