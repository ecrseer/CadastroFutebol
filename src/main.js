import { createApp } from 'vue'
import store from './store'
import mitt from 'mitt'

import App from './App.vue'
import './style/estilo.css'

const bus = mitt()
const app = createApp(App)
app.use(store)
app.config.globalProperties.$bus = bus
app.mount('#app')
