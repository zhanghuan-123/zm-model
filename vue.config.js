module.exports = {
  devServer: {
      port: 8080,
      // 配置浏览器输出异常
      overlay: {
        warnings: false,
        errors: true
      },
    proxy: {
      '/api': { // 代理所有以 '/api' 开头的请求
        target: 'http://localhost:3000', // 后端服务器地址
        changeOrigin: true, // 改变请求头中的Host为目标URL
        logLevel: "debug",
        pathRewrite: {
          '^/api': '' // 移除路径中的 '/api' 前缀（按需配置）
        }
      }
    }
  }
}
