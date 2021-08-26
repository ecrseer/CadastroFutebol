<template>
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
