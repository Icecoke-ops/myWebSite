<template>
    <div class="body">
        <div class="main">
            <div class="catalog">
                <DeepList path="/" @link-to="linkTo"></DeepList>
            </div>
            <div class="articale">
                <MdView :content="articaleContent"></MdView>
            </div>
        </div>
        <div class="footer">© 2026 冰可乐</div>
    </div>
</template>
<style scoped>
.body {
    padding: 5em 20%;

    .main {
        display: flex;
        gap: 2em;
        align-items: start;

        .catalog {
            width: 15em;
            flex-shrink: 0;
            border-radius: var(--radius);
            background-color: var(--bgcolor);
            backdrop-filter: var(--filter);
        }

        .articale {
            background-color: var(--bgcolor);
            backdrop-filter: var(--filter);
            border-radius: var(--radius);
            overflow-x: auto;
        }

    }

    .footer {
        --height: 3em;
        background-color: var(--bgcolor);
        backdrop-filter: calc(--filter);
        border-radius: var(--radius);
        height: var(--height);
        line-height: var(--height);
        text-align: center;
        margin-top: 2em;
        margin-bottom: 2em;
        color: rgb(50, 50, 50);
    }
}
</style>
<script setup>
import DeepList from '@/components/DeepList.vue';
import MdView from '@/components/MdView.vue';
import { GetArticale } from '@/js/API';
import { urlEncode } from '@/js/Utils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const articaleContent = ref(null)
onMounted(() => {
    let path = route.params.slug
    if (path == "") path = "index.md"
    else {
        let resPath = ""
        for (let p of path) resPath += "/" + p
        path = resPath
    }
    GetArticale(path, (content) => {
        articaleContent.value = content
    })
})
function linkTo(articalePath) {
    GetArticale(articalePath, (content) => {
        articaleContent.value = content
        router.push(`/blog${urlEncode(articalePath)}`)
    })
}
</script>
