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
    });


    this.$bus.on("TabelaSelectJogador", (jogadr) => {
      this.jogadorSelecionado = jogadr;
    });
    this.$bus.on("FormUnselectJogador",()=>{
      this.jogadorSelecionado = false
    })
  } /* 
  mounted() {
    this.$store.dispatch("carregar");    
  }, */,
  unmounted() {
    this.$bus.off("FormAddJogador");
    this.$bus.off("FormEditJogador");
    this.$bus.off("TabelaSelectJogador");
    this.$bus.off("FormUnselectJogador");
  },
};
</script>

