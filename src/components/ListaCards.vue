
<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="Jogador in entidades" v-bind:key="Jogador">
        <v-card >
          <v-img 
            :src="Jogador.foto"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="Jogador.nome"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon v-on:click="()=>this.adicionarJogador(Jogador)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListaCards",
  props:['entidades'],
  methods:{
    adicionarJogador(jogador){
      this.$bus.emit('addJogador', jogador)
    }
  }
};
</script>
