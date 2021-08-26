<template>
  <h2>pagina detalhes</h2>
  <Formulario v-bind:entidade="timeSelecionado" />
</template>

<script>
import { mapState } from "vuex";
import Formulario from "../components/Formulario.vue";
import TabelaGenerica from "../components/TabelaGenerica.vue";

let timeNovo = () => {
  return {
    id: "INCREMENT",
    nome: "",
    estado: "",
    tecnico: "",
    torcida: "",
    fundacao_ano: "",
    info: "",
  };
};

export default {
  components: { Formulario, TabelaGenerica },
  computed: {
    ...mapState(["editando", "times"]),

    timeSelecionado() {
      console.log(`id chegou e é ${this.$route.params.id}`)
      let timeFiltrado = this.times.filter(
        time => Number(time.id) === Number(this.$route.params.id)
      )[0]
       return timeFiltrado;
      return this.times[0];
    },
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

