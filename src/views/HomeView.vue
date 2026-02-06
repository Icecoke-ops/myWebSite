<template>
    <md-view :content="mdContent"></md-view>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import MdView from '@/components/MdView.vue';
import {GetArticale} from '@/js/API';

const mdContent = ref(null)

onMounted(() => {
    GetArticale("index.md", (res) => {
        mdContent.value = res
    })
})
</script>

