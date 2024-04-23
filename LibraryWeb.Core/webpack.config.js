/// <binding />
const path = require('path')

module.exports = {
    entry: './wwwroot/js/main.js',
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve('./wwwroot/js', 'dist'),
        filename: 'main_bundle.js'
    }
}