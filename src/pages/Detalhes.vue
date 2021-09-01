<template>
  <v-container class="grey lighten-5">
    <v-row :class="'mb-6'" no-gutters>
      <v-col cols="12" sm="5">
        <h3>Editar time</h3>
        <v-card class="pa-2" outlined tile>
          <Formulario
            v-bind:istimef="true"
            v-bind:entidade="timeSelecionado"
            v-bind:entenome="'Time'"
          >
          </Formulario>
        </v-card>
        <v-card class="pa-2" outlined tile>
          <TabelaGenerica
            v-bind:lista="jogadoresNoTime"
            :entenome="'Jogador'"
          />
        </v-card>

        <v-card class="pa-2" outlined tile>
          <h5>adicionar jogador no time</h5>
          <Formulario
            v-bind:entenome="'Jogador'"
            v-bind:entidadepai="timeSelecionado"
        /></v-card>
      </v-col>
      <v-col cols="12" sm="7">
        <h3>Jogadores que podem ser adicionados</h3>
        <ListaCards v-bind:entidades="jogadoresDisponiveis" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Formulario from "../components/Formulario.vue";
import ListaCards from "../components/ListaCards.vue";
import TabelaGenerica from "../components/TabelaGenerica.vue";

export default {
  components: { Formulario, TabelaGenerica, ListaCards },

  computed: {
    ...mapGetters(["getEntePorId", "getJogadoresDisponiveis"]),

    timeSelecionado() {
      return this.getEntePorId("times", this.$route.params.idtime);
    },
    jogadorSelecionado() {},
    jogadoresNoTime() {
      if (this.timeSelecionado.jogadores >= 1) {
        return this.timeSelecionado.jogadores;
      }
      return [{ id: "404", nome: "nulo" }];
    },
    jogadoresDisponiveis() {
      return this.getJogadoresDisponiveis();
    },
  },
  created() {
    this.$bus.on("addJogador", (jogadr) => {
      this.$store.dispatch("adicionarJogadorAoTime", [
        this.$route.params.idtime,
        jogadr,
      ]);
    });
    this.$bus.on("editJogador", (jogadr) => {
      this.$store.dispatch("editJogadorDoTime", [
        this.$route.params.idtime,
        jogadr,
      ]);
    });
  } /* 
  mounted() {
    this.$store.dispatch("carregar");    
  }, */,
  unmounted() {
    this.$bus.off("addJogador");
  },
};
</script>

