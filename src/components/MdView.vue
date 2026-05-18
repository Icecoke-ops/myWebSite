<template>
  <div ref="bodyRef" class="md-body" v-html="renderedHtml" />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, defineProps } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { katex } from '@mdit/plugin-katex'
import { enhanceMarkdownBody, handleCodeCopyClick } from '@/utils/markdownEnhance'

const props = defineProps({
  content: { type: String, default: null },
})

const bodyRef = ref(null)
const renderedHtml = ref('')

function highlightCode(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, { language: lang }).value
    } catch {
      /* fall through */
    }
  }
  return hljs.highlightAuto(str).value
}

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlightCode,
}).use(katex)

function onCopyClick(event) {
  if (bodyRef.value) {
    handleCodeCopyClick(event, bodyRef.value)
  }
}

async function renderContent(content) {
  if (content === null || content === undefined) {
    renderedHtml.value = ''
    return
  }
  renderedHtml.value = md.render(content)
  await nextTick()
  enhanceMarkdownBody(bodyRef.value)
}

watch(
  () => props.content,
  (val) => renderContent(val),
  { immediate: true }
)

onMounted(() => {
  bodyRef.value?.addEventListener('click', onCopyClick)
})

onBeforeUnmount(() => {
  bodyRef.value?.removeEventListener('click', onCopyClick)
})
</script>
