<template>
  
  <Formulario/>
  
</template>

<script>
import { mapState } from 'vuex'
import Formulario from './components/Formulario.vue'
 

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
  components: { Formulario},
  computed:{
    ...mapState(['editando'])
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

