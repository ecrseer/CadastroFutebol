import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue' 
import Detalhes from './pages/Detalhes.vue'
import CriarTime from './pages/CriarTime.vue'
import CriarJogador from './pages/CriarJogador.vue'
import ListaJogadores from './pages/ListaJogadores.vue'
const routes = [
  { path: '/', name:'home', component: Home }, 
  { path: '/lista-jogadores', name:'listajogadores', component:ListaJogadores },
  { path: '/detalhes-time/:idtime', name:'detalhestime', component: Detalhes },
  { path: '/criar-time', name:'criartime', component: CriarTime },
  { path: '/criar-jogador', name:'criarjogador', component: CriarJogador }
  
]

const rotas = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default rotas
