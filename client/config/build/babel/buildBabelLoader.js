const { removeDataTestIdBabelPlugin } = require("./removeDataTestIdBabelPlugin");

function buildBabelLoader({ mode }) {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins = [];

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    }

    return {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    [
                        "@babel/preset-react",
                        {
                            runtime: 'automatic',
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}

module.exports = { buildBabelLoader };
