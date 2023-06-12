const path = require('path');
const webpack = require('webpack');
const tasks = require("./tasks.json");
const fs = require('fs');

module.exports = {
    target: 'web',
    mode: "development",
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },

        before: function(app) {
            app.get('/tasks', function (req, res) {
                console.log("***** ");
                const filePath = path.resolve('tasks.json');
                fs.readFile(filePath, (err, data) => {
                    if (err) res.status(500).send(err);
                    console.log("***** ",data);
                    res.status(200).send(JSON.parse(data));
                });
            });
        }
    },
    devtool: 'sourcemap',
    resolve: {
        extensions: [".js", ".jsx"],
        fallback: {
            "fs": false
        },
    },
    module: {
        rules: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: [/\.less$/, /\.css$/],
            loader: "style-loader!css-loader!less-loader"
        }]
    }
};
