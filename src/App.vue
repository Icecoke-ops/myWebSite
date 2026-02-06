<template>
    <div class="body">
        <div class="header">
            <img alt="头像" class="face" src="/face.png"/>
            <div class="title">
                <h1>欢迎来到可乐空间</h1>
                <p>人生就像一罐可乐，第一口值2块！</p>
                <p class="nav">冰可乐的
                    <a href="/">主页</a>
                    <a href="/blog">博客</a>
                    <a href="https://github.com/Icecoke-ops" target="_blank">项目</a>
                    <a href="https://file.icecoke.cn" target="_blank">文件</a>
                </p>
            </div>
        </div>
        <div class="readme">
            <router-view/>
        </div>
        <div class="footer">© 2026 冰可乐</div>
    </div>
</template>
<style>
* {
    --radius: 1em;
    --filter: blur(10px);
    --bgcolor: rgba(255, 255, 255, 0.5);
}

html,
body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background-image: url('@/assets/bgImage.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

@font-face {
    font-family: 'xwzz';
    src: url('@/assets/xwzz.woff2') format('woff2');
}


@font-face {
    font-family: 'jbm';
    src: url('@/assets/jbm.woff2') format('woff2');
}

@font-face {
    font-family: 'lam';
    src: url('@/assets/lam.woff2') format('woff2');
}
</style>
<style scoped>
.body {
    --width: 60%;
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
            background-color: var(--bgcolor);
            border-radius: var(--radius);
            backdrop-filter: var(--filter);
            flex-grow: 1;

            h1 {
                padding: 0;
                margin-top: 20px;
                margin-left: 30px;
                margin-bottom: 0;
                letter-spacing: 0.1em;
                color: rgb(69, 212, 255);
            }

            p {
                margin-left: 30px;
                color: rgb(99, 99, 99);
                letter-spacing: 0.2em;
            }

            a {
                margin-left: 15px;
                padding-left: 0.2em;
                padding-bottom: 2px;
                color: rgb(69, 212, 255);
                user-select: none;
                cursor: pointer;
                justify-content: center;
                text-decoration: none;
                border-bottom: 2px solid rgb(69, 212, 255);
            }
        }
    }

    .readme {
        width: 100%;
        margin-top: 2em;
        border-radius: var(--radius);
        background-color: var(--bgcolor);
        box-sizing: border-box;
        backdrop-filter: var(--filter);
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
import {onMounted, ref} from 'vue';
import {GetArticale} from '@/js/API';

const mdContent = ref(null)

onMounted(() => {
    GetArticale("index.md", (res) => {
        mdContent.value = res
    })
})
</script>