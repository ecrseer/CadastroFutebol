import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue'   

const routes = [
  { path: '/', name:'home', component: Home }, 
  { path: '/lista-jogadores', name:'listajogadores', component:()=> import('./pages/ListaJogadores.vue') },
  { path: '/detalhes-time/:idtime', name:'detalhestime', component: ()=> import('./pages/Detalhes.vue') },
  
  { path: '/criar-time', name:'criartime', component: ()=> import('./pages/CriarTime.vue') },
  { path: '/criar-jogador', name:'criarjogador', component: ()=> import('./pages/CriarJogador.vue' ) }
  
]

const rotas = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default rotas
