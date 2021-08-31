
<template>
  <v-app>
    <v-main>
      <v-container class="ma-1">
      <router-view></router-view> 
        
      
      
      </v-container>
<v-bottom-navigation v-model="rota">
    <v-btn value="recent" v-on:click="$router.push({name:'home'})">
      <span>Listar Times</span>
      <v-icon>mdi-home</v-icon>      
    </v-btn>

    <v-btn value="favorites" v-on:click="$router.push({name:'criartime'})">
      <span>Criar time</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby" v-on:click="$router.push({name:'criarjogador'})">
      <span>Criar jogador</span>

      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn value="nearby" v-on:click="$router.push({name:'listajogadores'})">
      <span>Listar jogadores</span>

     <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
      </v-main>
      </v-app>
</template>

<script>
import { mapState } from "vuex";
import Formulario from "./components/Formulario.vue";
import Tabela from "./Tabela.vue";

export default {
  components: { Tabela, Formulario },
  data:()=>{
    return{rota:''}
  },
  computed: {
    ...mapState(["times"]),
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>
