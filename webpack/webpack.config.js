const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
    publicPath: '/dist/'
};
process.env.BABEL_ENV = TARGET;
var entries={
    app: [
        './scripts/App.jsx'
    ]
};
const common = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: PATHS.build,
        publicPath: PATHS.publicPath
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.scss'],
        modulesDirectories: ['node_modules', PATHS.app]
    },

    module: {
        loaders: [{
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports?jQuery=jquery'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff2'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-otf'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }, {
            test: /\.png$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.jpg$/,
            loader: 'file?name=[name].[ext]&limit=20'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },{
            test: /\.scss$/,
            loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            include:/scripts/
        }]
    },
    postcss: (webpack) => {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            }),
            postcssImport({
                addDependencyTo: webpack
            })
        ];
    }
};
if (TARGET === 'start' || !TARGET) {
    for (var entry in entries) {
        if (!entries.hasOwnProperty(entry))continue;
        entries[entry].unshift( 'webpack-dev-server/client?http://localhost:5000','webpack/hot/dev-server');
    }
    module.exports = merge(require('./dev.config.js'), common);
}

if (TARGET === 'build' || !TARGET) {
    module.exports = merge(require('./prod.config.js'), common);
}
