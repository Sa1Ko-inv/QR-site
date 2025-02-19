const webpack = require("webpack");
const { buildDevServer } = require("./buildDevServer");
const { buildPlagins } = require("./buildPlagins");
const { buildResolvers } = require("./buildResolvers");
const { buildLoaders } = require("./buildLoaders");

const buildWebpack = (options) => {
    const { mode, paths } = options;
    const isDev = mode === "development";

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: buildPlagins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}

module.exports = { buildWebpack };
