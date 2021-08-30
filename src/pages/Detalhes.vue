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
import { mapState } from "vuex";
import Formulario from "../components/Formulario.vue";

export default {
  components: { Formulario },

  computed: {
    ...mapState(["times"]),
    timeSelecionado() {
      let timeFiltrado = this.times.filter(
        (time) => Number(time.id) === Number(this.$route.params.idtime)
      )[0];
      return timeFiltrado;
    },
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

