import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/theme.css'
import '@/styles/base.css'
import '@/styles/glass.css'
import '@/styles/scrollbar.css'
import '@/styles/md-content.css'
import '@/styles/md-highlight.css'
import 'katex/dist/katex.min.css'

createApp(App).use(router).mount('#app')
