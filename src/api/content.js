import { GlobalConfig } from '@/config'
import { urlEncode } from '@/utils/urlEncode'

function processImageUrls(content) {
  return content.replace(/(!\[.*?\]\()(.+?)(\))/g, (match, prefix, src, suffix) => {
    if (src.startsWith('http') || src.startsWith('//')) {
      return match
    }
    const separator = src.startsWith('/') ? '' : '/'
    return `${prefix}${GlobalConfig.apiDomain}${separator}${src}${suffix}`
  })
}

async function requestText(url, options = {}) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.text()
}

export async function fetchArticle(articlePath) {
  const url = `${GlobalConfig.apiDomain}${urlEncode(articlePath)}?parse=false`
  const text = await requestText(url)
  return processImageUrls(text)
}

export async function fetchArticleList(path) {
  const url = `${GlobalConfig.artListDomain}?path=${encodeURIComponent(path)}`
  const text = await requestText(url)
  return JSON.parse(text)
}

/** @deprecated 保留回调风格以兼容旧调用，新代码请使用 fetchArticle */
export function GetArticale(articlePath, onSuccess, onError) {
  fetchArticle(articlePath).then(onSuccess).catch((err) => onError?.(err))
}

/** @deprecated 新代码请使用 fetchArticleList */
export function GetList(path, onSuccess, onError) {
  fetchArticleList(path).then(onSuccess).catch((err) => onError?.(err))
}
