const path = require('path');
const { name } = require('./package.json');

const isProd = process.env.NODE_ENV === 'production'
const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  babel: {
    plugins: [
      // 生产环境只留console.error、warn，去除console.log
      [
        'babel-plugin-transform-remove-console',
        { exclude: isProd ? ['error', 'warn'] : ['error', 'warn', 'log'] }
      ]
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          "targets": {
            "chrome": "49",
            "ios": "10"
          }
        }
      ]
    ]
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
    },
    configure(webpackConfig) {
      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, ...['.scss', '.css']];
      // 接入微前端框架qiankun的配置,不接入微前端可以不需要
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.globalObject = 'window';
      return webpackConfig;
    },
  },
  devServer: {
    // 本地服务的端口号
    port: 3001,
    // 本地服务的响应头设置
    headers: {
      // 允许跨域
      'Access-Control-Allow-Origin': '*',
    },
  },
};

