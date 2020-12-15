const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, 'src', 'client'),
    entry: {
        index: './index/index.js',
        panelControl: './panelControl/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [{
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: '/\.html$/',
                use: [
                    {
                        loader: "html-loader",
                        options:{
                            name:'[name].[ext]'
                        } 
                    }
                ],
                exclude: path.resolve(__dirname, 'src/client/views/index.html')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'    
                ]
            },  
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }, ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/[name]-styles.css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./views/index.html",
            chunks: ["index"]

        }),
        new HtmlWebpackPlugin({
            filename: "panelControl.html",
            template: "./views/panelControl.html",
            chunks: ["panelControl"]
        }),
        new CleanWebpackPlugin({
            //Simulate the removal of files
            dry: true,
            //Write Logs to Console
            verbose: true,
            //Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ]
};