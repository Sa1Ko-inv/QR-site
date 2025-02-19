const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { buildWebpack } = require("./config/build/buildWebpack");

module.exports = (env) => {
    const isProd = env.mode === 'production';

    const paths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.js'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    };

    const config = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
    });

    // Копируем build в docs только если папка build уже существует
    if (isProd) {
        config.plugins?.push({
            apply(compiler) {
                compiler.hooks.afterEmit.tap("CopyPlugin", () => {
                    const path = require('path');
                    const fs = require('fs');
                    const buildPath = path.resolve(__dirname, "build");
                    const docsPath = path.resolve(__dirname, "docs");

                    if (fs.existsSync(buildPath)) {
                        fs.rmSync(docsPath, { recursive: true, force: true });
                        fs.cpSync(buildPath, docsPath, { recursive: true });
                    }
                });
            }
        });
    }

    return config;
};
