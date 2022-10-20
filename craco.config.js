/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 13:19:41
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 13:20:23
 * @FilePath: \hrss-react-ts\craco.config.js
 * @Description:
 */
const path = require('path')

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
            // 约定：使用 @scss 表示全局 SASS 样式所在路径
            // 在 SASS 中使用
            '@scss': path.resolve(__dirname, 'src/assets/styles')
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://ihrm-java.itheima.net/',
                changeOrigin: true,
                pathRewrite: { // 路径重写
                    "^api": "", // 在转发请求时去掉多的/dev-api部分
                },
            }
        }
    }
}
