import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { resolveArticlePath } from '@/utils/articlePath'

export function useArticlePath() {
  const route = useRoute()
  return computed(() => resolveArticlePath(route.params.slug))
}
