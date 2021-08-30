<template>
  <TabelaGenerica v-bind:lista="jogadores" :entenome="'Jogador'"/> 
</template>

<script>
import { mapState } from 'vuex'

import TabelaGenerica from '../components/TabelaGenerica.vue'

export default {
  components: { TabelaGenerica},
  computed:{
    ...mapState(['jogadores'])
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
