
<template>
  <v-app>
    <v-main> 
     <v-app-bar
      dense
      dark
      class="esconde_mobile "
    > 
    <v-spacer></v-spacer>
      <v-toolbar-title>{{ NomeRotaAtual }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <BotoesRotas/>
      <v-spacer></v-spacer>
     </v-app-bar>
      <v-container class="ma-1">
        <router-view></router-view>
      </v-container>
      
      <v-bottom-navigation v-model="rota" class="hidden-sm-and-up" 
       > 
        <BotoesRotas/>
      </v-bottom-navigation>
      
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import BotoesRotas from './components/BotoesRotas.vue';
import Formulario from "./components/Formulario.vue";
import Tabela from "./Tabela.vue";

export default {
  components: { Tabela, Formulario, BotoesRotas },
  data: () => {
    return { rota: "" };
  },
  computed: {
    ...mapState(["times"]),
    NomeRotaAtual(){
      let str = ''+this.$route.name
      str = str.charAt(0).toUpperCase() + str.slice(1)
      return str;
  }
  }, 
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>
<style scoped>

@media (max-width: 500px)
{
  .esconde_mobile
   {
    display: none !important;
   }
}
</style>
