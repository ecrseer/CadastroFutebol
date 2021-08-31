<template>
  <v-container class="grey lighten-5">
    <v-row :class="'mb-6'" no-gutters>
      <v-col cols="12"
          sm="5">
        <v-card class="pa-2" outlined tile>
          <Formulario
            v-bind:istimef="true"
            v-bind:entidade="timeSelecionado"
            v-bind:entenome="'Time'"
          >
          </Formulario>
          <TabelaGenerica
            v-bind:lista="jogadoresNoTime"
            :entenome="'Jogador'"
          /> </v-card
      ></v-col>
      <v-col  cols="12"
          sm="7"> 
        <h3>Jogadores que podem ser adicionados</h3>
          <ListaCards v-bind:entidades="jogadoresDisponiveis"/> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Formulario from "../components/Formulario.vue";
import ListaCards from '../components/ListaCards.vue';
import TabelaGenerica from "../components/TabelaGenerica.vue";

export default {
  components: { Formulario, TabelaGenerica, ListaCards },

  computed: {
    ...mapGetters(["getEntePorId","getJogadoresDisponiveis"]),

    timeSelecionado() {
      return this.getEntePorId("times", this.$route.params.idtime);
    },
    jogadoresNoTime() {
      if (this.timeSelecionado.jogadores) {
        return this.timeSelecionado.jogadores;
      }
      return [{ id: "404", nome: "nulo" }];
    },
    jogadoresDisponiveis(){
      return this.getJogadoresDisponiveis();
    }
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

