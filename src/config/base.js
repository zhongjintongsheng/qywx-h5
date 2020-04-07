export default {
  // 主页url
  PORTAL: location.protocol + '//' + location.host + '/',
  // 单文件最大20M
  MAX_FILE_SIZE: 20,
  // 请求完成延迟关闭 loading 时间
  LOADING_DELAYED: 300,
  // 默认网络超时时间
  NETWORK_TIMEOUT: 60 * 1000,
  // 文件上传超时时间
  UPLOAD_TIMEOUT: 3 * 60 * 1000,
  // 文件下载超时时间
  DOWNLOAD_TIMEOUT: 3 * 60 * 1000,
  // 操作成功响应码
  SUCCESS_CODE: '0000',
  // 无资源权限
  NO_AUTH: '1021',
  // 登录超时响应码
  LOST_TOKEN: '9998',
  // 默认pageSize
  DEFAULT_PAGE_SIZE: 20,
  // 公钥
  PUBLIC_KEY: '-----BEGIN PUBLIC KEY-----\n' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApQFvmi+i7Xw9/iBmXdJw\n' +
  'xttUKJJvqKuIgSJEZzM3u5fZJrACKUZvVaOSynT15ihMGn5fFgbQsneToUczKIfO\n' +
  '2pbiSS88yiXSWMdAyxBH5u61/7npg9jkJYONymLrGNg02adAY5z41HJzBHiMyXNw\n' +
  'gdeTanDdZA6xDysAUIOXRQbEwLHfH7doD8tVTa56A5BBaEwWFv5hN0JghDnoEJ7V\n' +
  '9G0+17qkjNXNxaXBh6k6p6OTl4pZqu647VHDmsLzuu5SAOO9nfZrrt5zTy3WklSf\n' +
  'W8fxNHqqNuHKs9P+CTE33H0BhHWKspt9BsPd7V3u1RRoOf2yS0TB+L0J/ewdcjuR\n' +
  'LQIDAQAB\n' +
  '-----END PUBLIC KEY-----'
}
