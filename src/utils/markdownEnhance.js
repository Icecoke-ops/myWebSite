const LANG_LABELS = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  py: 'Python',
  python: 'Python',
  sh: 'Shell',
  bash: 'Bash',
  shell: 'Shell',
  json: 'JSON',
  html: 'HTML',
  css: 'CSS',
  vue: 'Vue',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  go: 'Go',
  rust: 'Rust',
  sql: 'SQL',
  yaml: 'YAML',
  yml: 'YAML',
  md: 'Markdown',
  markdown: 'Markdown',
}

const COPY_BTN_SVG = `<svg class="md-code-copy-icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`

function formatLangLabel(lang) {
  if (!lang) return ''
  const key = lang.toLowerCase()
  return LANG_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1)
}

function wrapTables(root) {
  root.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('md-table-wrap')) return
    const wrap = document.createElement('div')
    wrap.className = 'md-table-wrap'
    table.parentNode.insertBefore(wrap, table)
    wrap.appendChild(table)
  })
}

function enhanceCodeBlocks(root) {
  root.querySelectorAll('pre code').forEach((code) => code.classList.add('hljs'))

  root.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement?.classList.contains('md-code-wrap')) return

    const className = pre.querySelector('code')?.getAttribute('class') || ''
    const langMatch = className.match(/language-([\w+#-]+)/i)
    const label = formatLangLabel(langMatch ? langMatch[1] : '')
    const langHtml = label ? `<span class="md-code-lang">${label}</span>` : ''

    const wrap = document.createElement('div')
    wrap.className = 'md-code-wrap'
    pre.parentNode.insertBefore(wrap, pre)
    wrap.appendChild(pre)

    const header = document.createElement('header')
    header.className = 'md-code-header'
    header.innerHTML = `${langHtml}<button type="button" class="md-code-copy" title="复制代码" aria-label="复制代码">${COPY_BTN_SVG}<span class="md-code-copy-text">复制</span></button>`
    wrap.insertBefore(header, pre)
  })
}

export function enhanceMarkdownBody(root) {
  if (!root) return
  wrapTables(root)
  enhanceCodeBlocks(root)
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export async function handleCodeCopyClick(event, root) {
  const btn = event.target.closest('.md-code-copy')
  if (!btn || !root.contains(btn)) return

  const text = btn.closest('.md-code-wrap')?.querySelector('pre code')?.textContent ?? ''
  const label = btn.querySelector('.md-code-copy-text')

  try {
    await copyText(text)
    btn.classList.add('is-copied')
    if (label) label.textContent = '已复制'
    clearTimeout(btn._copyTimer)
    btn._copyTimer = setTimeout(() => {
      btn.classList.remove('is-copied')
      if (label) label.textContent = '复制'
    }, 2000)
  } catch {
    if (label) label.textContent = '失败'
    clearTimeout(btn._copyTimer)
    btn._copyTimer = setTimeout(() => {
      if (label) label.textContent = '复制'
    }, 2000)
  }
}
