<template>
  <h2>pagina crioar Jogador</h2>
  <Formulario v-bind:istimef="false"
  v-bind:entenome="'Jogador'"/>
</template>

<script> 
import Formulario from "../components/Formulario.vue";


export default {
  components: { Formulario }
};
</script>

