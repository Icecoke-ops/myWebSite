<template>
  <router-view />
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
  /* font-weight: normal;
  font-style: normal;
  font-display: swap; */
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
