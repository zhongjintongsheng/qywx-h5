const files = require.context('.', true, /\.js/)
const modules = {}

files.keys().forEach((key) => {
  if (key === './index.js') {
    return
  }
  Object.assign(modules, files(key).default)
})

export default modules
