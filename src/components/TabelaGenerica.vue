<template>
  <table>
    <thead>
      <tr>
        <th v-for="(atributo, key) in lista[0]" v-bind:key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
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
  props: ["lista"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  },
  computed: {
    //...mapState(["carregando"]),
  },
  methods: {
    ...mapActions(["apagar"]),
    editar(item) {
      
      this.$router.push({
        path: `/detalhes-time/${item.id}`
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