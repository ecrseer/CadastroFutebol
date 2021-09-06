<template>
  <v-container class="grey lighten-5">
    <v-row :class="'mb-6'" no-gutters>
      <v-col cols="12" sm="6">
        <v-card class="pa-2 mb-6" outlined tile>
          <Formulario
            v-bind:istimef="true"
            v-bind:entidade="timeSelecionado"
            v-bind:entenome="'Time'"
          >
          </Formulario>
        </v-card>

        <v-card class="pa-2 mb-6" outlined tile>
          <TabelaGenerica
            v-bind:lista="timeSelecionado.jogadores"
            :entenome="'Jogador'"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <v-card class="pa-2" outlined tile>
          <Formulario
            v-bind:entenome="'Jogador'"
            v-bind:entidade="jogadorSelecionado"
            v-bind:entidadepai="timeSelecionado"
        /></v-card>
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
  data: () => {
    return {
      jogadorSelecionado: false,
    };
  },
  computed: {
    ...mapGetters(["getEntePorId", "getJogadoresDisponiveis"]),

    timeSelecionado() {
      return this.getEntePorId("times", this.$route.params.idtime);
    },
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
    this.$bus.on("FormAddJogador", (jogadr) => {
      this.$store.dispatch("criarJogador", [this.timeSelecionado, jogadr]);
       
    });
    this.$bus.on("FormEditJogador", (antigoEnovo) => {
      this.$store.dispatch("editarJogador", antigoEnovo);
      this.$store.dispatch("editarTime", {
        original: false,
        editado: this.timeSelecionado,
      });
    });
    this.$bus.on("FormDeleteJogador", () => {
      this.$store.dispatch("apagarJogador", {
        time: this.timeSelecionado,
        jogador: this.jogadorSelecionado,
      });
      this.$store.dispatch("editarTime", {
        original: false,
        editado: this.timeSelecionado,
      });
      this.$router.go()
    });
    /* 
    this.$bus.on("FormAddTime", (jogadr) => {
       
      this.$store.dispatch("criarTime", [this.timeSelecionado, jogadr]);
    });
    this.$bus.on("FormEditTime", (antigoEnovo) => {
      this.$store.dispatch("editarTime", antigoEnovo);
    }); */

    this.$bus.on("TabelaSelectJogador", (jogadr) => {
      this.jogadorSelecionado = jogadr;
    });
    this.$bus.on("FormUnselectJogador", () => {
      this.jogadorSelecionado = false;
    });
  },
  unmounted() {
    this.$bus.off("FormAddJogador");
    this.$bus.off("FormEditJogador");
    this.$bus.off("TabelaSelectJogador");
    this.$bus.off("FormUnselectJogador");
  },
};
</script>

