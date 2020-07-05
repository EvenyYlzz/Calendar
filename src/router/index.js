import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home/Home'

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {
          path: '/',
          name: 'HOME',
          component: Home
        },
    ]
})

export default router
