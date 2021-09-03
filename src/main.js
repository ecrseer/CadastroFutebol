import { createApp } from 'vue'
import store from './store'
import mitt from 'mitt'

import App from './App.vue'
import './styles/estilo.css'
import rotas from './rotas.js'
import vuetify from './plugins/vuetify'

const bus = mitt()
const app = createApp(App)

app.use(store)
app.use(rotas)
app.use(vuetify)

app.config.globalProperties.$bus = bus
app.mount('#app')
