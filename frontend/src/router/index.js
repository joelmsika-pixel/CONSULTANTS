import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
    { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
    { path: '/services', name: 'services', component: () => import('../pages/ServicesPage.vue') },
    { path: '/news', name: 'news', component: () => import('../pages/NewsPage.vue') },
    { path: '/news/:slug', name: 'news-detail', component: () => import('../pages/NewsDetailPage.vue') },
    { path: '/faq', name: 'faq', component: () => import('../pages/FaqPage.vue') },
    { path: '/contact', name: 'contact', component: () => import('../pages/ContactPage.vue') },
    {
      path: '/consultation',
      name: 'consultation',
      component: () => import('../pages/ConsultationPage.vue'),
    },
    { path: '/forum', name: 'forum', component: () => import('../pages/ForumPage.vue') },
    { path: '/forum/topics/:id', name: 'forum-topic', component: () => import('../pages/ForumTopicPage.vue') },
    { path: '/admin', name: 'admin', component: () => import('../pages/AdminPage.vue') },
    { path: '/admin/content', name: 'admin-content', component: () => import('../pages/AdminContentPage.vue') },
    { path: '/admin/forum', name: 'admin-forum', component: () => import('../pages/ForumModerationPage.vue') },
    { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
    { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFoundPage.vue') },
  ],
})

export default router
