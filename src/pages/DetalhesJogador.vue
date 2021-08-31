<template>
  <h2>Detalhes do time</h2>
  <Formulario v-bind:entidade="JogadorSelecionado"
    v-bind:entenome="'Jogador'"/>
</template>

<script>
import { mapGetters } from "vuex";
import Formulario from "../components/Formulario.vue"; 
 

export default {
  components: { Formulario },
  computed: { 
    ...mapGetters(['getEntePorId']),

    JogadorSelecionado() { 
      return this.getEntePorId('jogadores',this.$route.params.idjogador)
          },
  },/* 
  mounted() {
    this.$store.dispatch("carregar");
  }, */
};
</script>

