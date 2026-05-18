<template>
    <div class="body">
        <div class="header">
            <img alt="头像" class="face" src="/face.png"/>
            <div class="title glass-panel glass-panel--bordered">
                <h1>欢迎来到可乐空间</h1>
                <p>人生就像一罐可乐，第一口值2块！</p>
                <p class="nav">冰可乐的
                    <router-link to="/">主页</router-link>
                    <router-link to="/blog">博客</router-link>
                    <a href="https://github.com/Icecoke-ops" target="_blank" rel="noopener noreferrer">项目</a>
                    <a href="https://file.icecoke.cn" target="_blank" rel="noopener noreferrer">文件</a>
                </p>
            </div>
        </div>
        <div :class="isBlogRoute ? 'blog-shell' : 'readme glass-panel glass-panel--bordered'">
            <router-view/>
        </div>
        <div class="footer glass-panel glass-panel--bordered">© 2026 冰可乐</div>
    </div>
</template>

<style scoped>
.body {
    --width: var(--layout-width);
    width: var(--width);
    padding-top: 3em;
    margin-left: calc((100% - var(--width)) / 2);

    .header {
        display: flex;
        gap: 4em;
        justify-content: space-between;

        .face {
            border-radius: var(--radius);
            height: 10em;
        }

        .title {
            flex-grow: 1;

            h1 {
                padding: 0;
                margin-top: 20px;
                margin-left: 30px;
                margin-bottom: 0;
                letter-spacing: 0.1em;
                color: var(--color-accent);
            }

            p {
                margin-left: 30px;
                color: var(--color-text-secondary);
                letter-spacing: 0.2em;
            }

            a,
            :deep(a) {
                margin-left: 15px;
                padding-left: 0.2em;
                padding-bottom: 2px;
                color: var(--color-accent);
                user-select: none;
                cursor: pointer;
                text-decoration: none;
                border-bottom: 2px solid var(--color-accent);
            }

            :deep(.router-link-active) {
                font-weight: 500;
            }
        }
    }

    .readme {
        width: 100%;
        margin-top: 2em;
    }

    .blog-shell {
        width: 100%;
        margin-top: 2em;
        box-sizing: border-box;
    }

    .footer {
        --height: 3em;
        height: var(--height);
        line-height: var(--height);
        text-align: center;
        margin-top: 2em;
        margin-bottom: 2em;
        color: var(--color-text);
    }
}
</style>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isBlogRoute = computed(() => route.path.startsWith('/blog'))
</script>
