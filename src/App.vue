<template>
<h1>dddf</h1>
<ul>
    <li>
      <router-link to="/">home</router-link>
    </li>
    <li>
      <router-link to="/detalhes-time">detalhes</router-link>
    </li>
  </ul>

  <router-view></router-view>

</template>

<script>
import { mapState } from 'vuex'
import Formulario from './components/Formulario.vue'
import Tabela from './Tabela.vue'

let timeNovo = () => {
  return {
    'id': 'INCREMENT',
    'nome': '',
    'estado': '',
    'tecnico': '',
    'torcida': '',
    'fundacao_ano': '',
    'info': ''
  }
}

export default {
  components: {Tabela, Formulario},
  computed:{
    ...mapState(['times'])
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

