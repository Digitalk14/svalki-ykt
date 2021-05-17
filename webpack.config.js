const webpack = require('webpack');
const dotenv = require('dotenv').config()
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle-main.js',
        path: path.resolve(__dirname, "build"),
        publicPath: '/'
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
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.GOOGLE_USER_ID': JSON.stringify(process.env.GOOGLE_USER_ID),
            'process.env.UPLOAD_CARE_KEY': JSON.stringify(process.env.UPLOAD_CARE_KEY)
        }),
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
            '/api':'http://127.0.0.1:3051',
        }
    }
};