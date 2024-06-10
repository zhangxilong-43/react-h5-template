const path = require('path');
const { name } = require('./package.json');
const dotenv = require('dotenv');
dotenv.config();

const CracoLessPlugin = require('craco-less');
const postcssPx2Rem = require('postcss-pxtorem');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProd = process.env.NODE_ENV === 'production';
const pathResolve = pathUrl => path.join(__dirname, pathUrl);
const port = 3001;

module.exports = {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    babel: {
        plugins: [
            // 生产环境只留console.error、warn，去除console.log
            [
                'babel-plugin-transform-remove-console',
                { exclude: isProd ? ['error', 'warn'] : ['error', 'warn', 'log'] },
            ],
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        chrome: '49',
                        ios: '10',
                    },
                },
            ],
        ],
    },
    webpack: {
        alias: {
            '@': pathResolve('src'),
            '@assets': pathResolve('src/assets'),
            '@components': pathResolve('src/components'),
            '@constants': pathResolve('src/constants'),
            '@containers': pathResolve('src/containers'),
            '@hooks': pathResolve('src/hooks'),
            '@mocks': pathResolve('src/mocks'),
            '@routes': pathResolve('src/routes'),
            '@services': pathResolve('src/services'),
            '@styles': pathResolve('src/styles'),
            '@types': pathResolve('src/types'),
            '@utils': pathResolve('src/utils'),
            '@contexts': pathResolve('src/contexts'),
            '@static': pathResolve('src/static'),
            '@pages': pathResolve('src/pages'),
        },
        configure(webpackConfig) {
            // 配置扩展扩展名
            webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, ...['.scss', '.css']];
            webpackConfig.output.publicPath = isProd // 在生产环境下需要配置完整路径以便作为微应用引入时能够正确索引到资源
                ? process.env.__WEBPACK_PUBLIC_PATH__
                : `http://localhost:${port}/`;
            webpackConfig.output.library = `${name}-[name]`;
            webpackConfig.output.libraryTarget = 'umd';
            webpackConfig.output.globalObject = 'window';
            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    // 配置可以参照webpack的less-loader具体配置
                    lessOptions: {
                        javascriptEnabled: true, // 允许less文件中使用js表达式
                    },
                },
            },
        },
        {
            plugin: BundleAnalyzerPlugin,
        },
    ],
    style: {
        postcss: {
            mode: 'extends',
            loaderOptions: () => {
                return {
                    postcssOptions: {
                        ident: 'postcss',
                        config: false,
                        plugins: [
                            postcssPx2Rem({
                                rootValue: 37.5, // 设计稿尺寸/10
                                propList: ['*'], // 需要转换的样式属性，默认为 ['*']，即匹配所有属性
                                exclude: /node_modules/i, // 排除掉node_modules中转换
                            }),
                        ],
                    },
                    sourceMap: false,
                };
            },
        },
    },
    devServer: {
        // 本地服务的端口号
        port,
        // 本地服务的响应头设置
        headers: {
            // 允许跨域
            'Access-Control-Allow-Origin': '*',
        },
    },
};
