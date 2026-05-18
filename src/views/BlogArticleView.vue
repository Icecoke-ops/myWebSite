<template>
  <ArticleContent :path="articlePath" />
</template>

<script setup>
import ArticleContent from '@/components/ArticleContent.vue'
import { useArticlePath } from '@/composables/useArticlePath'

const articlePath = useArticlePath()
</script>
