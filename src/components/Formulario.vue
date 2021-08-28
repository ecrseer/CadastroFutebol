<template>
  <div>
    <Campo nome="nome" v-model="time.nome"></Campo>
    <CampoDropDown
      nome="estado"
      v-model="time.estado"
      :itens="ESTADOS"
    ></CampoDropDown>
    <Campo nome="tecnico" v-model="time.tecnico"></Campo>
    <Campo nome="torcida" tipo="number" v-model="time.torcida"></Campo>
    <Campo nome="fundacao" tipo="number" v-model="time.fundacao_ano"></Campo>
    <CampoText tipo="texto" nome="info" v-model="time.info"></CampoText>

    <span v-if="carregando">carregando...</span>
    <button v-else @click="salvar" id="test_btnsalvar">salvar</button>

    <span v-if="carregando">carregando</span>
    <button v-else @click="apagar(time)">apagar</button>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Campo from "./Campo.vue";
import CampoDropDown from "./CampoDropDown.vue";
import CampoText from "./CampoText.vue";
import { ESTADOS, useSheetApi } from "../const.js";
 
export default {
  name: "Formulario",
  components: { Campo, CampoDropDown, CampoText },
  props: ["entidade"],
  data() {
    return {
      editando: false,
      ESTADOS,
      time: {},
    };
  },

  computed: {
    ...mapState(["carregando"]),
  },
  methods: {
    ...mapGetters("getUltimoId"),
    timenovin() {
      return {
        id: useSheetApi ? "INCREMENT" : this.getUltimoId,
        nome: "",
        estado: "",
        tecnico: "",
        torcida: "",
        fundacao_ano: "",
        info: "",
      };
    },
    async salvar() {
      if (!this.entidade) {
        await this.$store.dispatch("criarTime", this.time);
        this.time = this.timenovin();
      } else {
        await this.$store.dispatch("editarTime", {
          original: this.entidade,
          editado: this.time,
        });

        this.time = {};
      }
      this.$router.push({
        name:'home'
      })
    },
    async apagar(time) {
      await this.$store.dispatch("apagarTime", time);

      this.$router.push({
        path: `/detalhes-time/${item.id}`,
      });
    },
  },
  created() {
    /* this.$bus.on('editarTime', (time) => { 
        this.editando = time
        this.time = {...time} 
    })  */
  },
  mounted() {
    if (this.entidade) {
      this.time = { ...this.entidade };
    } else {
      this.time = this.timenovin();
    }
  } /* ,
  unmounted() {
    this.$bus.off("editar");
  }, */,
};
</script>
