<template>
    <div class="main">
        <div class="catalog">
            <DeepList path="/" @link-to="linkTo"></DeepList>
        </div>
        <div class="article">
            <MdView :content="articleContent"></MdView>
        </div>
    </div>
</template>
<style scoped>

.main {
    display: flex;
    gap: 2em;
    align-items: start;

    .catalog {
        width: 13em;
        flex-shrink: 0;
    }

    .article {
        overflow-x: auto;
    }

}
</style>
<script setup>
import DeepList from '@/components/DeepList.vue';
import MdView from '@/components/MdView.vue';
import {GetArticale} from '@/js/API';
import {urlEncode} from '@/js/Utils';
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute()
const router = useRouter()
const articleContent = ref(null)
onMounted(() => {
    let path = route.params.slug
    if (path === "") path = "index.md"
    else {
        let resPath = ""
        for (let p of path) resPath += "/" + p
        path = resPath
    }
    GetArticale(path, (content) => {
        articleContent.value = content
    })
})

function linkTo(articlePath) {
    GetArticale(articlePath, (content) => {
        articleContent.value = content
        router.push(`/blog${urlEncode(articlePath)}`)
    })
}
</script>
