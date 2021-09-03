
<template>
  
    <v-btn value="recent" v-on:click="$router.push({ name: 'home' })">
      <span>Listar Times</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="favorites" v-on:click="$router.push({ name: 'criartime' })">
      <span>Criar time</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby" v-on:click="$router.push({ name: 'listajogadores' })">
      <span>Listar jogadores</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  
</template>

<script>
export default {};
</script>
<style scoped>
</style>
