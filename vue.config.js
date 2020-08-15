module.exports = {
  configureWebpack: {
      resolve:{
        extensions:[],
        alias:{
          'assets':'@/assets',
          'common':'@/common',
          'components':'@/components',
          'network':'@/network',
          'view':'@/view',
          'store':'@/store'
        }
      }
    }
  }
  