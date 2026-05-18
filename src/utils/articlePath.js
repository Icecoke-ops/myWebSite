/** 将路由 slug 参数解析为 API 文章路径 */
export function resolveArticlePath(slug) {
  if (!slug || (Array.isArray(slug) && slug.length === 0)) {
    return 'index.md'
  }
  const parts = Array.isArray(slug) ? slug : [slug]
  return parts.reduce((acc, part) => `${acc}/${part}`, '')
}
