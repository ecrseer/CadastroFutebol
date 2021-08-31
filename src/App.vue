
<template>
  <v-app>
    <v-main>
      <h1>t</h1>
      <ul>
        <li>
          <router-link to="/">home</router-link>
        </li>
        <li>
          <router-link to="/criar-time">Criar time</router-link>
        </li>
        <li>
          <router-link to="/criar-jogador">Criar jogador</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'listajogadores' }"
            >Listar jogadores</router-link
          >
        </li>
      </ul>

      <router-view></router-view> </v-main
  ></v-app>
</template>

<script>
import { mapState } from "vuex";
import Formulario from "./components/Formulario.vue";
import Tabela from "./Tabela.vue";

export default {
  components: { Tabela, Formulario },
  computed: {
    ...mapState(["times"]),
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>
