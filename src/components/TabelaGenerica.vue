<template>
  <table>
    <thead>
      <tr>
        <th v-for="(atributo, key) in lista[0]" v-bind:key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody id="test_tabela">
      <tr v-for="item in lista" v-bind:key="item">
        <td v-for="(atributo, key) in item" v-bind:key="key">
          {{ atributo }}
        </td>
        <td>
          <button class="colorido" @click="editar(item)">editar</button>
        </td> 
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TabelaGenerica",
  props: ["lista","entenome"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  }, 
  methods: {
    ...mapActions(["apagar"]),
    editar(item) {
      let rota_ente=this.entenome.toLowerCase();
       this.apagar();
      this.$router.push({
        path: `/detalhes-${rota_ente}/${item.id}`
      });
 
    },
  },
  unmounted() {
    /* gambiarra */
    //this.$bus.emit("editarTime", this.entidadeSelecionada);
  },
};
</script>
<style scoped>
.colorido {
  background-color: #d90df0;
}
</style>