export const routes = [
  {
    name: 'Main',
    path: '/',
    component: () => import('@/pages/Editor.vue'),
  },
  {
    name: 'Landing',
    path: '/landing',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('@/pages/About.vue'),
  },
  {
    name: 'Terms of Use',
    path: '/terms-of-use',
    component: () => import('@/pages/TermsOfUse.vue'),
  },
  {
    name: 'Support',
    path: '/support',
    component: () => import('@/pages/Support.vue'),
  },
  {
    name: 'Questions',
    path: '/questions',
    component: () => import('@/pages/Questions.vue'),
  },
  {
    path: '/editor',
    redirect: '/',
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/generics/Generics404.vue'),
  },
]
