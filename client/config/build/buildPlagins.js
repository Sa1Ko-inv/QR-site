const {DefinePlugin} = require("webpack");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

function buildPlagins({mode, paths, analyzer, platform}) {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            inject: 'body',
            favicon: path.resolve(paths.public, 'QR-icons.png')
        }),

        new Dotenv(),

        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
            // 'process.env': JSON.stringify(process.env),
        }),
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        plugins.push(new CopyPlugin({
            patterns: [
                {from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales'),},
            ],
        }))
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}

module.exports = {buildPlagins};