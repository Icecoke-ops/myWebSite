<template>
  <div class="article-content">
    <p v-if="loading" class="article-content__status">加载中…</p>
    <p v-else-if="error" class="article-content__status article-content__status--error">{{ error }}</p>
    <MdView v-else-if="content !== null" :content="content" />
  </div>
</template>

<style scoped>
.article-content__status {
  margin: 0;
  padding: 2em 1.5em;
  text-align: center;
  font-family: 'xwzz', sans-serif;
  color: var(--color-text-secondary);
  letter-spacing: 0.08em;
}

.article-content__status--error {
  color: #b45309;
}
</style>

<script setup>
import MdView from '@/components/MdView.vue'
import { useMarkdownArticle } from '@/composables/useMarkdownArticle'
import { defineProps, toRef } from 'vue'

const props = defineProps({
  path: { type: String, required: true },
})

const { content, loading, error } = useMarkdownArticle(toRef(props, 'path'))
</script>
