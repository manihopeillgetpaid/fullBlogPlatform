const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Adjust this to your entry file path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Add .ts and .tsx here
  },
  module: {
    rules: [
       {
      test: /\.tsx?$/,
      use: 'babel-loader', // Use babel-loader for TypeScript files
      exclude: /node_modules/,
    },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  mode: 'development',
};