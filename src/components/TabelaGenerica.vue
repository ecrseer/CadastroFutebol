<template>
  <table  >
    <thead>
      <tr>
        <th v-for="(atributo, key) in lista[0]" v-bind:key="key">
          <span v-if="!Array.isArray(atributo)">{{ key }}</span>
        </th>
      </tr>
    </thead>
    <tbody id="test_tabela">
      <tr v-for="item in lista" v-bind:key="item" v-bind:class="item===entidadeSelecionada?'colorido':''">
        <td v-for="(atributo, key) in item" v-bind:key="key"
        >
          <span v-if="!Array.isArray(atributo)">{{atributo}}</span>
        </td>
        <td>
          <v-btn class="colorido" @click="editar(item)">editar</v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TabelaGenerica",
  props: ["lista", "entenome"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  },
  methods: {
    editar(item) {
      if(this.entenome==="Jogador"){
        if(this.entidadeSelecionada === item){
          this.$bus.emit("FormUnselectJogador");
          this.entidadeSelecionada={}
        }else{          
          this.$bus.emit('TabelaSelectJogador',item)
          this.entidadeSelecionada=item
        }

        return;
      }

      let rota_ente = this.entenome.toLowerCase();

      this.$router.push({
        path: `/detalhes-${rota_ente}/${item.id}`,
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
  background-color: #b6e7ae;
}
</style>