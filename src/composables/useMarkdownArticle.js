import { ref, watch, toValue } from 'vue'
import { fetchArticle } from '@/api/content'

export function useMarkdownArticle(pathSource) {
  const content = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load(path) {
    if (!path) return
    loading.value = true
    error.value = null
    try {
      content.value = await fetchArticle(path)
    } catch {
      content.value = null
      error.value = '文章加载失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  watch(
    () => toValue(pathSource),
    (path) => load(path),
    { immediate: true }
  )

  return { content, loading, error }
}
