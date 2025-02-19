const {ModuleOptions} = require('webpack');
const {BuildOptions} = require("./types/types");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const {buildBabelLoader} = require("./babel/buildBabelLoader");


const buildLoaders = (options) => {
    const isDev = options.mode === "development";

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    // icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    }

    const babelLoader = buildBabelLoader(options);

    return [
        assetLoader,
        scssLoader,
        babelLoader,
        svgrLoader,
    ]
}

module.exports = { buildLoaders }

    // const tsLoader = {
    // ts-loader может работать с JXS
    // Если бы мы не использовали тайпскрипт, то нужен был бы babel-loader
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }
    // const tsLoader = {
    //     // ts-loader может работать с JXS
    //     // Если бы мы не использовали тайпскрипт, то нужен был бы babel-loader
    //     exclude: /node_modules/,
    //     test: /\.tsx?$/,
    //     use: [
    //         {
    //             loader: 'ts-loader',
    //             options: {
    //                 transpileOnly: true,
    //                 getCustomTransformers: () => ({
    //                     before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //                 }),
    //             }
    //         }
    //     ]
    // }

