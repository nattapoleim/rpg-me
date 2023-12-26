import CharacterView from '@/views/CharacterView.vue'
import FightView from '@/views/FightView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView,
      },
      {
         path: '/character',
         name: 'character',
         component: CharacterView,
      },
      {
         path: '/fight',
         name: 'fight',
         component: FightView,
      },
   ],
})

export default router
