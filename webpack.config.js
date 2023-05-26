const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: "./index.tsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'build'), // change this,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // for good ol' css
            { test: /\.css?$/, use: ['style-loader', 'css-loader'] },
            // OR if using less
            { test: /\.less?$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            // OR if using scss
            { test: /\.scss?$/, use: ['style-loader', 'css-loader', 'scss-loader'] },

            // images and fonts
            {
                test: /\.(gif|ttf|eot|svg?)$/,
                use: 'url-loader?name=[name].[ext]',
            },
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                dependency: { not: ['url'] },
            },
            {
                test: /\.(png|webp|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    watch: false,
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({ template: "./index.html", inject: false, })
    // ],

    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '/')
        }
    },
}