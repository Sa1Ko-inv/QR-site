// const { Configuration as DevServerConfiguration } = require("webpack-dev-server");
const type  = require("webpack-dev-server");
const {BuildOptions} = require("./types/types");
const {buildWebpack} = require("./buildWebpack");

const buildDevServer = (options) => {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true, // Включает поддержку SPA маршрутов
        hot: true, // Горячая перезагрузка
    }
}

module.exports = { buildDevServer };