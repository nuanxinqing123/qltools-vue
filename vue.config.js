const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      "/url": {
        target: "http://127.0.0.1:15000",
        changeOrigin: true,
        pathRewrite: {
          "^/url": ""
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? '/static'
      : '/',
}
