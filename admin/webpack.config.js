const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, "build")
    },
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,
        hot: true,
        proxy: {
            '/api':'http://localhost:3051',
        }
    }
};