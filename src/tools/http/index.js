import axios from './axios'
import config from '@/config'
import util from '@/tools/util'

function checkOpts ({ url }) {
  if (!url) {
    throw new Error(`无效的请求地址：${url}`)
  }
}

function getConfig (opts) {
  let { method, url, paramType, param = {} } = opts
  let axiosConfig = {
    method,
    url
  }
  // get 请求
  if (method === 'get') {
    axiosConfig.params = param
  }
  // post 请求
  if (method === 'post') {
    switch (paramType) {
      case 'FormData':
        let formData = new FormData()
        Object.entries(param).forEach(([key, val]) => {
          formData.append(key, val)
        })
        axiosConfig.data = formData
        break
      default:
        axiosConfig.data = param
    }
  }
  // 设置 timeout
  if (opts.timeout) {
    axiosConfig.timeout = opts.timeout
  }
  // 设置 responseType
  if (opts.responseType) {
    axiosConfig.responseType = opts.responseType
  }
  return axiosConfig
}

function ajax (opts) {
  // 1.参数校验
  checkOpts(opts)
  // 2.获取请求配置
  let axiosConfig = getConfig(opts)
  // 3.开启加载中
  let { loading = true } = opts
  if (loading) {
    util.showLoading(true)
  }
  // 4.发出请求
  let { success = () => {}, fail = () => {}, error = () => {}, complete = () => {} } = opts
  axios(axiosConfig)
    .then(response => {
      // 关闭加载中
      if (loading) {
        setTimeout(() => {
          util.showLoading(false)
        }, config.LOADING_DELAYED)
      }
      // 如果没有拿到响应（报错的时候）
      if (!response) {
        return
      }
      // 如果是下载文件
      if (axiosConfig.responseType === 'blob') {
        opts.success(response)
        return
      }
      let { respCode, respMsg } = response.data
      if (respCode !== config.SUCCESS_CODE) {
        util.toast(respMsg)
        fail(response.data)
        complete(response.data)
        return
      }
      success(response.data)
      complete(response.data)
    })
    .catch(err => {
      // 关闭加载中
      if (loading) {
        setTimeout(() => {
          util.showLoading(false)
        }, config.LOADING_DELAYED)
      }
      util.toast(err.message)
      error(err)
      complete(err)
    })
}

function get (opts = {}) {
  opts.method = 'get'
  ajax(opts)
}

function post (opts = {}) {
  opts.method = 'post'
  ajax(opts)
}

function parseFilename (headers) {
  let dis = headers['content-disposition']
  let ar = dis.split('=')
  let filename
  if (ar.length > 1) {
    filename = decodeURIComponent(ar[1])
  }
  return filename
}

function downloadFile (filename, blob) {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    let downloadUrl = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.style = 'display: none'
    a.href = downloadUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      URL.revokeObjectURL(downloadUrl)
    }, 500)
  }
}

function download (opts = {}) {
  let { success = () => {}, fail = () => {}, complete = () => {} } = opts
  opts.method = 'get'
  opts.responseType = 'blob'
  opts.timeout = config.DOWNLOAD_TIMEOUT
  opts.success = (response) => {
    if (response.headers['content-disposition']) {
      // 1.解析文件名称
      let filename = parseFilename(response.headers)
      // 2.下载文件
      downloadFile(filename, response.data)
      util.toast('下载成功')
      success()
      complete()
      return
    }
    // 如果下载不成功
    let reader = new FileReader()
    reader.onload = function (event) {
      let error = JSON.parse(event.target.result)
      if (error.respCode === config.LOST_TOKEN) {
        if (process.env.NODE_ENV === 'development') {
          devLogin()
        } else {
          util.toast(error.respMsg)
          setTimeout(() => {
            util.go2Login()
          }, 1500)
        }
      }
      fail()
      complete()
    }
    reader.readAsText(response.data)
  }
  ajax(opts)
}

function upload (opts = {}) {
  if (!opts.file) {
    throw new Error('文件不能为空')
  }
  // 转 base64 前开启加载中
  let { loading = true } = opts
  if (loading) {
    util.showLoading(true)
  }
  let reader = new FileReader()
  reader.onload = () => {
    let file = {
      fileName: opts.file.raw.name,
      fileBase64: reader.result.split(',')[1]
    }
    opts.method = 'post'
    opts.param = Object.assign(file, opts.param)
    opts.timeout = config.UPLOAD_TIMEOUT
    ajax(opts)
  }
  reader.readAsDataURL(opts.file.raw)
}

// 控制登录次数（30S内只登录一次）
let count = 0
function devLogin () {
  if (!count) {
    count++
    let param = {
      loginName: config.LOGIN_NAME,
      password: util.sha256(config.LOGIN_NAME + util.sha256(config.PASSWORD))
    }
    this.post({
      url: config.PORTAL + 'ework/portal/login',
      param,
      success: ({ data }) => {
        util.setStorage('user', data)
        util.setCookie('token', data.token)
      }
    })
    setTimeout(() => {
      count = 0
    }, 30 * 1000)
  }
}

/**
 * 基本参数说明：
 * url: String 接口地址
 * param: Object 参数
 * loading: Boolean 是否控制 loading，默认 true
 * success: Function 成功回调，参数为后台返回的 data
 * fail：Function 失败回调，参数为后台返回的 data
 * error：Function 异常回调，参数为 error 对象
 * complete：Function 请求结束都会执行的回调，参数为后台返回的 data  或者 error 对象
 */
export default {
  /**
   * 未封装的基本请求方法
   */
  axios,
  /**
   * get 请求
   * 同基本参数
   */
  get,
  /**
   * post 请求
   * 同基本参数
   * paramType: String 参数类型【JSON、FormData】，默认 JSON
   */
  post,
  /**
   * 文件下载
   * 同基本参数
   */
  download,
  /**
   * 单个文件上传(base64格式)
   * 同基本参数
   * file: File 需要上传的文件
   */
  upload,
  /**
   * 开发环境登录
   */
  devLogin
}
