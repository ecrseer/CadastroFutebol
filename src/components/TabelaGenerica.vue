<template>
  <table>
    <thead>
    <tr >
      <th v-for="(atributo,key) in lista[0]" v-bind:key="key">
        {{ key }}</th>
        <th>{{this.listaFiltrada}}</th>
        

    </tr>
    </thead>
    <tbody>
    <tr v-for="item in lista" v-bind:key="item">
      <td v-for="(atributo,key) in item" v-bind:key="key">
        {{ atributo }}
      </td>
      <td>
          <button class="colorido" @click="editar(item)">editar</button>
        </td>
        <td>
          <span v-if="carregando">carregando</span>
          <button v-else @click="apagar(item)">apagar</button>
        </td>
        
    </tr>
    </tbody>
  </table>
</template>

<script>

import { mapActions, mapState } from 'vuex'
export default {
  name: 'TabelaGenerica',
  props:['lista'],
  
  computed: {
    ...mapState(['carregando']),
    listaFiltrada(){
      return this.lista[0].nome;
    }
  },
  methods: {
    ...mapActions(['apagar']),
    editar(item){

      this.$bus.emit('editar', item)
    }
  }
}
</script>
<style scoped>

.colorido {
  background-color: #d90df0;
}


</style>