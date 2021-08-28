import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue' 
import Detalhes from './pages/Detalhes.vue'
import CriarTime from './pages/CriarTime.vue'

const routes = [
  { path: '/', name:'home', component: Home }, 
  { path: '/detalhes-time/:idtime', name:'detalhestime', component: Detalhes },
  { path: '/criar-time', name:'criartime', component: CriarTime }
  
]

const rotas = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default rotas
