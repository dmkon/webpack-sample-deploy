const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src');
const VENDOR_LIBS = [
    'react',
    'react-dom',
    'react-router-dom'
];

const config = {
    mode: "development",
    //context: path.resolve(__dirname, ''),
    // entry: {
    //   //main: APP_DIR + '/app.js'
    //   main: './src/index.js'
    // },
    entry: {
        bundle: './src/index.js',
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
        // 'vendor-react': 'react',
        // 'vendor-react-dom': 'react-dom',
        // 'vendor-react-router-dom': 'react-router-dom',
    },
    output: {
        // filename: "[name].[hash].js",
        // //path: path.resolve(__dirname, BUILD_DIR),
        // path: path.resolve(__dirname, "dist"),
        // //path: BUILD_DIR,
        // //publicPath: "/"
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js"
        //publicPath: "/",
    },

    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },

    // devServer: {
    //     contentBase: "dist",
    //     overlay: true,
    //     hot: true,
    //     stats: {
    //         colors: true
    //     }
    // },

    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                //include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ["babel-preset-env", "react", "stage-2"],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            //outputPath: '/'
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        contentBase: [BUILD_DIR],
        compress: true,
        port: 9000,
        disableHostCheck: false,
        headers: {
            "X_Custom-header": "custom"
        },
        open: true,
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}

module.exports = config;