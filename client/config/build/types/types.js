const BUILD_MODES = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};

const PLATFORMS = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile'
};

const buildPaths = {
    entry: '',
    html: '',
    output: '',
    src: '',
    public: ''
};

const buildOptions = {
    mode: BUILD_MODES.DEVELOPMENT,
    port: 3000,
    platform: PLATFORMS.DESKTOP,
    analyzer: false,
    paths: buildPaths
};

module.exports = {
    BUILD_MODES,
    PLATFORMS,
    buildPaths,
    buildOptions
};
