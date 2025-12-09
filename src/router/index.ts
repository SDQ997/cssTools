// @ts-ignore
import { createRouter, createWebHistory, createWebHashHistory ,RouteRecordRaw } from 'vue-router'
import Index from "@/views/index/index.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: '',
    redirect:"/index",
  },
  {
    path: '/',
    name: '/',
    redirect:"/index",
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    redirect:"/index/home",
    children:[
      {
        path:'home',
        name:'home',
        component:() => import('@/views/home/index.vue')
      },
      {
        path:'gradient',
        name:'gradient',
        component:() => import('@/views/gradient/index.vue')
      },
      {
        path:'shadow',
        name:'shadow',
        component:() => import('@/views/shadow/index.vue')
      },
      {
        path:'border',
        name:'border',
        component:() => import('@/views/border/index.vue')
      },
      {
        path:'transform',
        name:'transform',
        component:() => import('@/views/transform/index.vue')
      },
      {
        path:'filter',
        name:'filter',
        component:() => import('@/views/filter/index.vue')
      },
      {
        path:'shape',
        name:'shape',
        component:() => import('@/views/shape/index.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
