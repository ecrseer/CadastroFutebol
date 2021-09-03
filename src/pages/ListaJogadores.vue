<template>
  <TabelaGenerica v-bind:lista="todosJogadoresNosTimes" :entenome="'Jogador'"/> 
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import TabelaGenerica from '../components/TabelaGenerica.vue'

export default {
  components: { TabelaGenerica},
  computed:{
    ...mapState(['jogadores']),
    ...mapGetters(['getTodosJogadores']),
    todosJogadoresNosTimes(){
      return this.getTodosJogadores
    }
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
