/**
 * Created by argaman on 1/7/2017.
 */

const path = require('path');

module.exports = {

    entry: {
        app: './app/components/app.module.js'
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    }

};