// https://umijs.org/config/
import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const {REACT_APP_ENV} = process.env;

export default defineConfig({
  hash: true,
  history: { type: 'hash' },
  // qiankun: {
  //   master: {
  //     // 注册子应用信息
  //     apps: [
  //       {
  //         name: 'system', // 唯一 id
  //         entry: '_quankun', // html entry
  //       },
  //     ],
  //   },
  // },
  antd: {},
  dva: {
    hmr: true,
  },
  fastRefresh: {},
  layout: {
    name: '海外油气新项目评价和投资综合决策平台',
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },
  // dynamicImport: { // ie不支持
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  REACT_APP_ENV: REACT_APP_ENV || false,
  manifest: {
    basePath: '/',
  },
  // https://github.com/zthxxx/react-dev-inspector
  plugins: ['react-dev-inspector/plugins/umi/react-inspector'],
  inspectorConfig: {
    // loader options type and docs see below
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  resolve: {
    includes: ['src/components'],
  },

});
