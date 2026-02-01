<template>
    <ol>
        <li v-for="(item, index) in contentList" :key="index" @click.stop="clickItem(item)">
            {{ item.name }}
            <DeepList v-if="showSub[item.path]" :path="item.path" @link-to="(path) => $emit('linkTo', path)"></DeepList>
        </li>
    </ol>
</template>
<style scoped>
ol {
    list-style: none;
    margin: 0;
    padding: 1em 0.5em;
    font-family: 'xwzz';
    font-size: small;
}

li {
    --height: 2em;
    line-height: var(--height);
    margin-top: 0.5em;
    padding: 0 0.5em;
    box-shadow: rgb(120, 120, 120) 0 0 2px;
    border-radius: calc(var(--radius)/2);
    user-select: none;
    cursor: pointer;
}

li:hover {
    box-shadow: rgb(120, 120, 120) 0 0 4px;
}
</style>
<script setup>
import { GetList } from '@/js/API';
import { defineProps, onMounted, defineEmits, ref } from 'vue';
const props = defineProps(["path"])
const emits = defineEmits(['linkTo'])
const contentList = ref([])
const showSub = ref({})

onMounted(() => {
    GetList(props.path, (res) => {
        contentList.value = res.filter((item) => {
            showSub.value[item.path] = false
            if (item.name.startsWith(".")) return false
            if (item.subNodes == null) return item.name.endsWith(".md")
            return true
        })
    })
})

const clickItem = (item) => {
    if (item.subNodes == null) {
        emits("linkTo", item.path)
        return
    }
    showSub.value[item.path] = !showSub.value[item.path]
    return false
}
</script>
