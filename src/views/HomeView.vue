<template>
    <div class="body">
        <div class="readme">
            <md-view :content="mdContent"> </md-view>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import MdView from '@/components/MdView.vue';
import { GetArticale } from '@/js/API';

const mdContent = ref(null)

onMounted(() => {
    GetArticale("index.md", (res) => {
        mdContent.value = res
    })
})
</script>

<style scoped>
.body {

    .readme {
        width: 100%;
        margin-top: 2em;
        border-radius: var(--radius);
        background-color: var(--bgcolor);
        box-sizing: border-box;
        backdrop-filter: var(--filter);
    }
}
</style>
