const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 3002,
        open: true,
        hot: true,
        proxy: {
            "/api": {
                target: "http://localhost:3003",
                secure: false
            }
        },
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    "primary-color": "#459C60",
                                    "link-color": "#35794a"
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ]
            },
            {
                test: /\.(sa|sc|c)ss/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            import: false
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.(sa|sc|c)ss/i,
                use: [
                    "style-loader",
                    "css-loader"
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                include: '/src/img/',
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: 'images',
                            outputPath: 'images',
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: false,
                            mimetype: 'image/png'
                        }
                    },
                ],
                type: 'javascript/auto'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    stats: {
        children: true
    },
    target: "web",
}