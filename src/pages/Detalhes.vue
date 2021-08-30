<template>
  <div>
    <Formulario
      v-bind:istimef="true"
      v-bind:entidade="timeSelecionado"
      v-bind:entenome="'Time'"
    >
    </Formulario>
    <TabelaGenerica v-bind:lista="jogadoresNoTime"
     :entenome="'Jogador'"/> 
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Formulario from "../components/Formulario.vue";
import TabelaGenerica from '../components/TabelaGenerica.vue';

export default {
  components: { Formulario, TabelaGenerica },

  computed: {
    ...mapGetters(["getEntePorId"]),
    
    timeSelecionado() {
        return this.getEntePorId('times',this.$route.params.idtime);
    },
    jogadoresNoTime(){
      if(this.timeSelecionado.jogadores){
        return this.timeSelecionado.jogadores
      }
      return [{id:'404',nome:'nulo'}]
    },
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

