const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  devServer: {
    port: {{ port }},
    proxy: {
      '/ework': {
        target: 'http://172.16.208.22:9995/',
        changeOrigin: true
      },
      '/mapi': {
        target: 'http://172.16.208.22:9993/coop-loan/',
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.VUE_APP_BUILD_PATH,
  outputDir: '../../package/{{ projName }}',
  indexPath: '../../package/{{ projName }}/index.html',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      let envTestFlag = process.env.VUE_APP_CONSOLE === 'Y'
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }))
      config.plugins.push(new VConsolePlugin({
        filter: [],
        enable: envTestFlag
      }))
      config.plugins.push(new TerserPlugin({
        terserOptions: {
          compress: {
            drop_debugger: !envTestFlag,
            drop_console: !envTestFlag
          }
        },
        sourceMap: false,
        parallel: true
      }))
      config.plugins.push(new FileManagerPlugin({
        onStart: [
          {
            delete: [path.join(config.output.path, '..', '{{ projName }}.zip')]
          }
        ],
        onEnd: [
          {
            copy: [
              {
                source: config.output.path,
                destination: path.join(config.output.path, '../temp-{{ projName }}/{{ projName }}')
              }
            ]
          },
          {
            archive: [
              {
                source: path.join(config.output.path, '../temp-{{ projName }}'),
                destination: path.join(config.output.path, '..', '{{ projName }}.zip')
              }
            ]
          },
          {
            delete: [path.join(config.output.path, '../temp-{{ projName }}')]
          }
        ]
      }))
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
