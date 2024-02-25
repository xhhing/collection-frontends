import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/home',
      name:'home',
      component: () => import('../views/Home.vue'),
      redirect:'/home/blogs',
      children:[
        {
          path:'/home/blogs',
          name:'homeBlogs',
          component:() => import('../views/home/blogs.vue')
        },
        {
          path:'/home/loginer',
          name:'homeLoginer',
          component: () => import('../views/home/loginer.vue')
        },
        {
          path:'/home/blogDetail',
          name:'blogDetail',
          component: () => import('../views/home/blogDetail.vue')
        },
        {
          path:'/home/setting',
          name:'setting',
          component: () => import('../views/home/setting.vue'),
          children:[
            {
              path:'/home/setting/profile',
              name:'profile',
              component: () => import('../views/set/profile.vue'),
            },
            {
              path:'/home/setting/account',
              name:'account',
              component: () => import('../views/set/account.vue'),
            },
          ],
          redirect:'/home/setting/profile',
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path:'/editor',
      name:'editor',
      component: () => import('../views/Editor.vue')
    },
  ]
})

export default router
