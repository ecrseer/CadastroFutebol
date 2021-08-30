<template>
  <h2>Detalhes do time</h2>
  <Formulario v-bind:entidade="JogadorSelecionado"
    v-bind:entenome="'Jogador'"/>
</template>

<script>
import { mapState } from "vuex";
import Formulario from "../components/Formulario.vue"; 
 

export default {
  components: { Formulario },
  computed: {
    ...mapState(["jogadores"]),

    JogadorSelecionado() {
      console.log(`idJogador chegou e é ${this.$route.params.idJogador}`)
      let JogadorFiltrado = this.jogadores.filter(
        Jogador => Number(Jogador.id) === Number(this.$route.params.idJogador)
      )[0]
       return JogadorFiltrado; 
    },
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

