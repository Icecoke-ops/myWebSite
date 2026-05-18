<template>
    <div class="blog-layout">
        <aside class="catalog glass-panel glass-panel--bordered scrollbar-thin">
            <header class="catalog-header">
                <span class="catalog-header__mark" aria-hidden="true" />
                <h2 class="catalog-header__title">文章目录</h2>
            </header>
            <DeepList path="/" @link-to="onArticleLink" />
        </aside>
        <main class="article glass-panel glass-panel--shadow-soft">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
.blog-layout {
    display: flex;
    gap: 2em;
    align-items: flex-start;
}

.catalog {
    width: 16.5em;
    flex-shrink: 0;
    position: sticky;
    top: 1rem;
    max-height: calc(100vh - 2rem);
    overflow-x: hidden;
    overflow-y: auto;
}

.catalog-header {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.85rem 0.9rem 0.55rem;
    border-bottom: 1px solid var(--glass-border-subtle);
}

.catalog-header__mark {
    width: 3px;
    height: 1rem;
    border-radius: 2px;
    background: linear-gradient(180deg, var(--color-accent), var(--color-accent-muted));
}

.catalog-header__title {
    margin: 0;
    font-family: 'xwzz', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: var(--color-accent);
}

.article {
    flex: 1;
    min-width: 0;
    overflow-x: auto;
}
</style>

<script setup>
import DeepList from '@/components/DeepList.vue'
import { urlEncode } from '@/utils/urlEncode'
import { useRouter } from 'vue-router'

const router = useRouter()

function onArticleLink(articlePath) {
    router.push(`/blog${urlEncode(articlePath)}`)
}
</script>
