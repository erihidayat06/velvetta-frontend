import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/talent',
        name: 'TalentList',
        component: () => import('@/views/TalentList.vue'),
      },
      {
        path: '/talent/:id',
        name: 'TalentDetail',
        component: () => import('@/views/TalentDetail.vue'),
      },
      {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/Product.vue'),
      },
      {
        path: '/casting',
        name: 'Casting',
        component: () => import('@/views/Casting.vue'),
      },
      {
        path: '/qna',
        name: 'QNA',
        component: () => import('@/views/QNA.vue'),
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/Contact.vue'),
      },
      {
        path: '/mystery-talent',
        name: 'MysteryTalent',
        component: () => import('@/views/MysteryTalent.vue'),
      },
      {
        path: '/payment',
        name: 'Payment',
        component: () => import('@/views/Payment.vue'),
      },
      {
        path: '/news/:id',
        name: 'NewsDetail',
        component: () => import('@/views/NewsDetail.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

