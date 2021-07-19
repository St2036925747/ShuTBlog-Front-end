module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
    proxy: {
      '/shutblog': {
        target: 'http://localhost:8081', // 目标接口域名
        secure: false, // false为http访问，true为https访问
        changeOrigin: true // 是否跨域
      }
    }, // 设置代理
    before: app => {}
  }
}
