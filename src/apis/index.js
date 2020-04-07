import config from '@/config'

const files = require.context('.', true, /\.js/)
const modules = {}
const exclude = ['base']

files.keys().forEach((key) => {
  if (key === './index.js') {
    return
  }
  modules[key.replace(/(^\.\/|\.js$)/g, '')] = { ...files(key).default }
})

Object.entries(modules).forEach(([moduleName, moduleUrls]) => {
  if (exclude.includes(moduleName)) {
    return
  }
  Object.entries(moduleUrls).forEach(([key, url]) => {
    moduleUrls[key] = config.APPLICATION_NAME + '/' + url
  })
})

export default modules
