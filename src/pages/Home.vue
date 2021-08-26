<template>
<router-link :to="{ name: 'detalhestime', 
params: { id:1} }">ID1 </router-link>
  <TabelaGenerica v-bind:lista="times"/> 
</template>

<script>
import { mapState } from 'vuex'

import TabelaGenerica from '../components/TabelaGenerica.vue'

export default {
  components: { TabelaGenerica},
  computed:{
    ...mapState(['times'])
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
