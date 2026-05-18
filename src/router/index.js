import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/blog',
    component: () => import('@/views/BlogLayout.vue'),
    children: [
      {
        path: '',
        name: 'blog',
        component: () => import('@/views/BlogArticleView.vue')
      },
      {
        path: ':slug(.*)*',
        name: 'blog-article',
        component: () => import('@/views/BlogArticleView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
