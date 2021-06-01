/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/cs2bs/': {
      target: 'http://192.168.0.56:8080/BS_Demo_war_exploded/',
      changeOrigin: true,
      pathRewrite: {'^/cs2bs': ''},
    },
    '/_api/': {
      target: 'http://192.168.0.204:8080/',
      changeOrigin: true,
      pathRewrite: {'^/_api': ''},
    },
    '/_quankun/': {
      target: 'http://192.168.0.224:8080/',
      changeOrigin: true,
      pathRewrite: {'^_quankun': ''},
    },
  },
  test: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  pre: {
    '/api/': {
      target: 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
};
