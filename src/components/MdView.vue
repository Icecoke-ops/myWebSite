<template>
    <div class="md-body"> </div>
</template>

<script setup>
import { defineProps, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import $ from "jquery"
import hljs from 'highlight.js';
import { katex } from "@mdit/plugin-katex";
import 'highlight.js/styles/github-dark.css'

const props = defineProps(["content"])
const md = MarkdownIt({
    html: true,        // 启用 HTML 标签支持
    linkify: true,     // 自动将 URL 转换为链接
    typographer: true  // 启用美化排版
}).use(katex);

watch(() => props.content, (newVal) => {
    if (newVal !== null) {
        $(".md-body").html(md.render(props.content))
        hljs.highlightAll()
        initCopyButtons()
    }
})

function initCopyButtons() {
    $(".md-body pre").each(function () {
        const $pre = $(this);
        if ($pre.find('.copy-code').length) return;

        const codeText = $pre.text();
        const $copyBtn = $('<button class="copy-code">复制</button>');

        $copyBtn.click(() => {
            navigator.clipboard.writeText(codeText).then(() => {
                $copyBtn.text("已复制");
                setTimeout(() => $copyBtn.text("复制"), 2000);
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });

        $pre.prepend($copyBtn);
    });
}
</script>

<style>
.md-body {
    font-family: 'xwzz', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.8;
    color: #2c3e50;
    margin: 0 auto;
    padding: 2em;

    /* 标题样式 */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #0056b3;
        font-weight: 600;
        margin-bottom: 0.8em;
        line-height: 1.3;
    }

    h1 {
        text-align: center;
        font-size: 2.2em;
        padding-bottom: 15px;
        border-bottom: 2px solid rgb(0, 122, 255);
    }

    h2 {
        font-size: 1.8em;
        border-left: 4px solid #4a90e2;
        padding-left: 12px;
        background-color: transparent;
        transition: all 0.2s ease;
    }

    h2:hover {
        background-color: #f0f7ff;
        border-left: 4px solid #0056b3;
    }

    h3 {
        font-size: 1.5em;
        color: #007AFF;
        border-bottom: 1px solid #f0f7ff;
        padding-bottom: 4px;
    }

    p {
        margin: 1.2em 0;
    }

    mark {
        background: linear-gradient(to bottom, transparent 60%, rgba(0, 122, 255, 0.18) 0%);
        color: #0056b3;
        padding: 0 4px;
        border-radius: 2px;
        font-weight: 500;
    }

    strong {
        color: #004494;
    }

    em {
        color: #50616d;
    }

    a {
        color: #007AFF;
        text-decoration: none;
        position: relative;
        transition: all 0.3s ease;

        &:hover {
            color: #004494;
            background-color: rgba(0, 122, 255, 0.05);
        }
    }

    blockquote {
        margin: 1.5em 0;
        padding: 0.1px 0.5em;
        /* padding: 0.5em 0.6em; */
        background-color: #f8fbff;
        border-left: 4px solid #4a90e2;
        border-radius: 0 6px 6px 0;
        color: #4a5568;
        transition: all 0.2s ease;
    }

    blockquote:hover {
        background-color: #edf6ff;
        border-left: 4px solid #0056b3;
    }

    img {
        display: block;
        margin: 30px auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 122, 255, 0.1);
        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

        &:hover {
            transform: scale(1.02);
            box-shadow: 0 15px 40px rgba(0, 122, 255, 0.15);
        }
    }

    img+em,
    img+span {
        display: block;
        text-align: center;
        font-size: 0.85em;
        color: #8e9aaf;
        margin-top: -15px;
        margin-bottom: 25px;
    }

    ul,
    ol {
        padding-left: 1.5em;
    }

    li {
        margin: 0.5em 0;
    }

    li::marker {
        color: #007AFF;
        font-weight: bold;
    }

    .katex {
        font-family: 'lam';
        font-weight: 900;

        .katex-html {
            display: none;
        }
    }

    pre {
        color: #edf6ff;
        position: relative;
        padding: 0.4em;
        border-radius: 8px;
        overflow-x: auto;
        line-height: 1.6;
        background-color: #0d1117;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
    }

    code {
        border-radius: 8px;
        font-family: 'jbm';
        font-size: 0.8em;
    }

    .copy-code {
        position: absolute;
        top: 0.7em;
        right: 0.7em;
        background: rgba(226, 232, 240, 0.75);
        color: #4a5568;
        border: 1px solid rgba(148, 163, 184, 0.25);
        backdrop-filter: blur(4px);
        padding: 0.15em 0.4em;
        border-radius: 4px;
        font-size: 0.65em;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        transition: all 0.2s ease;
        opacity: 0;
        transform: translateX(4px);
        z-index: 10;
    }

    pre:hover .copy-code {
        opacity: 1;
        transform: translateX(0);
    }

    .copy-code:hover {
        background: #4a90e2;
        color: white;
        box-shadow: 0 2px 4px rgba(74, 144, 226, 0.3);
        transform: translateY(-1px);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        font-size: 0.9em;
        text-align: center;

        th {
            background-color: #007AFF;
            color: white;
            padding: 2px;
        }

        td {
            border-bottom: 1px solid rgb(179, 179, 179);
            padding: 2px;
            background-color: #fcfdfe;
        }

        tr:hover {
            background-color: rgba(0, 174, 255, 0.582);
        }
    }

    hr {
        border: none;
        height: 1px;
        background: linear-gradient(to right, transparent, #007AFF, transparent);
        margin: 4em 0;
        opacity: 0.3;
    }
}

/* 响应式样式也需要放在 :deep 内部或全局 */
@media (max-width: 768px) {
    :deep(.md-body) {
        h1 {
            font-size: 1.8em;
        }

        h2 {
            font-size: 1.5em;
        }
    }
}
</style>
