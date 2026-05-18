<template>
    <ul class="deep-list" :class="{ 'deep-list--nested': nested }">
        <li v-for="item in contentList" :key="item.path" class="tree-item">
            <button
                type="button"
                class="tree-row"
                :class="{
                    'tree-row--folder': item.subNodes != null,
                    'tree-row--file': item.subNodes == null,
                    'tree-row--active': isActive(item),
                    'tree-row--expanded': showSub[item.path],
                }"
                @click.stop="clickItem(item)"
            >
                <span
                    v-if="item.subNodes != null"
                    class="tree-chevron"
                    aria-hidden="true"
                />
                <span v-else class="tree-dot" aria-hidden="true" />
                <span class="tree-label">{{ displayName(item.name) }}</span>
            </button>
            <DeepList
                v-if="item.subNodes != null && showSub[item.path]"
                nested
                :path="item.path"
                @link-to="(path) => $emit('linkTo', path)"
            />
        </li>
    </ul>
</template>

<style scoped>
.deep-list {
    list-style: none;
    margin: 0;
    padding: 0.35rem 0.65rem 0.65rem;
}

.deep-list--nested {
    padding: 0.15rem 0 0.15rem 0.55rem;
    margin-left: 0.65rem;
    border-left: 1px solid var(--color-accent-border);
}

.tree-item {
    margin: 0.2rem 0;
}

.tree-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    min-height: 2.1rem;
    padding: 0.35rem 0.55rem;
    border: none;
    border-radius: var(--radius-sm);
    background: transparent;
    font-family: 'xwzz', sans-serif;
    font-size: 0.88rem;
    line-height: 1.35;
    color: var(--color-text-tree);
    text-align: left;
    cursor: pointer;
    transition:
        background-color 0.18s ease,
        color 0.18s ease,
        box-shadow 0.18s ease;
}

.tree-row:hover {
    background: var(--color-accent-muted);
    color: var(--color-text-tree-hover);
}

.tree-row--active {
    background: var(--color-accent-muted);
    color: var(--color-text-tree-active);
    box-shadow: inset 3px 0 0 var(--color-accent);
}

.tree-row--folder {
    font-weight: 500;
    color: var(--color-text-tree);
}

.tree-row--folder:hover {
    color: var(--color-text-tree-hover);
}

.tree-chevron {
    flex-shrink: 0;
    width: 0.45rem;
    height: 0.45rem;
    border-right: 1.5px solid var(--color-accent-glow);
    border-bottom: 1.5px solid var(--color-accent-glow);
    transform: rotate(-45deg) translateY(-1px);
    transition: transform 0.2s ease;
}

.tree-row--expanded .tree-chevron {
    transform: rotate(45deg) translate(-1px, -1px);
}

.tree-dot {
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    margin-left: 0.12rem;
    border-radius: 50%;
    background: var(--color-accent-glow);
}

.tree-row--active .tree-dot {
    background: var(--color-accent);
    box-shadow: 0 0 6px var(--color-accent-glow);
}

.tree-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<script setup>
import { fetchArticleList } from '@/api/content'
import { useArticlePath } from '@/composables/useArticlePath'
import { defineEmits, defineProps, onMounted, ref } from 'vue'

const props = defineProps({
    path: { type: String, required: true },
    nested: { type: Boolean, default: false },
})
const emit = defineEmits(['linkTo'])

const articlePath = useArticlePath()
const contentList = ref([])
const showSub = ref({})

function displayName(name) {
    return name.endsWith('.md') ? name.slice(0, -3) : name
}

function isActive(item) {
    return item.subNodes == null && item.path === articlePath.value
}

onMounted(async () => {
    try {
        const res = await fetchArticleList(props.path)
        const filtered = res.filter((item) => {
            if (item.name.startsWith('.')) return false
            if (item.subNodes == null) return item.name.endsWith('.md')
            return true
        })
        filtered.forEach((item) => {
            showSub.value[item.path] = false
        })
        contentList.value = filtered
    } catch {
        contentList.value = []
    }
})

function clickItem(item) {
    if (item.subNodes == null) {
        emit('linkTo', item.path)
        return
    }
    showSub.value[item.path] = !showSub.value[item.path]
}
</script>
