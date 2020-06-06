const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        port: 8082,
    },
    output: {
              libraryTarget: 'var',
              library: 'Client'
            },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: ['babel-loader', {loader: 'eslint-loader', options: { emitError: true }}]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader',
                       { loader: 'css-loader',
                         options: { sourceMap: true }
                       },
                       { loader:'sass-loader',
                         options: { sourceMap: true }
                       }
                     ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}
