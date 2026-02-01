<template>
    <div class="md-body"> </div>
</template>

<script setup>
import { defineProps, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import $ from "jquery"
import hljs from 'highlight.js';
import { katex } from "@mdit/plugin-katex";
import 'highlight.js/styles/github-dark.min.css'

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
    }
})
</script>

<style>
.md-body {
    font-family: 'xwzz', sans-serif;
    line-height: 1.8;
    color: #2c3e50;
    margin: 0 auto;
    padding: 1em;

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
        border-left: 6px solid #007AFF;
        padding-left: 16px;
        background: linear-gradient(to right, #f0f7ff, transparent);
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
        position: relative;
        margin: 0;
        padding: 0.5em;
        background: linear-gradient(135deg, #f8fbff 0%, #ffffff 100%);
        border-left: 3px solid #007AFF;
        border-radius: 0 12px 12px 0;
        color: #4a5568;
        box-shadow: 0 4px 12px rgba(0, 86, 179, 0.05);
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



    code {
        padding: 0 0.3em;
        border-radius: 12px;
        font-family: 'jbm';
        font-size: 0.8em;
    }

    pre {
        background-color: #f9fbfc;
        border: 1px solid #eef2f7;
        padding: 1em;
        border-radius: 12px;
        overflow-x: auto;
        line-height: 1.5;
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
