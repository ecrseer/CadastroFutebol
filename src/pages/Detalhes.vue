<template>
  <div>
    <Formulario
      v-bind:istimef="true"
      v-bind:entidade="timeSelecionado"
      v-bind:entenome="'Time'"
    >
    </Formulario>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Formulario from "../components/Formulario.vue";

export default {
  components: { Formulario },

  computed: {
    ...mapGetters(["getEntePorId"]),
    timeSelecionado() {
      
        return this.getEntePorId('times',this.$route.params.idtime);
    },
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

