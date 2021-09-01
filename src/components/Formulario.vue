<template>
  <form>
    <div>
      <section v-if="istimef">
        <Campo nome="nome" v-model="Time.nome"></Campo>
        <CampoDropDown
          nome="estado"
          v-model="Time.estado"
          :itens="ESTADOS"
        ></CampoDropDown>
        <Campo nome="tecnico" v-model="Time.tecnico"></Campo>
        <Campo nome="torcida" tipo="number" v-model="Time.torcida"></Campo>
        <Campo
          nome="fundacao"
          tipo="number"
          v-model="Time.fundacao_ano"
        ></Campo>
        <CampoText tipo="texto" nome="info" v-model="Time.info"></CampoText>
      </section>
      <section v-else>
        <Campo nome="nome" v-model="Jogador.nome"></Campo>
        <Campo nome="salario" v-model="Jogador.salario"></Campo>
        <Campo nome="camisa" tipo="number" v-model="Jogador.camisa"></Campo>
        <Campo nome="posicao" v-model="Jogador.posicao"></Campo>
      </section>
      <span v-if="carregando">carregando...</span>
      <button v-else @click="salvar" id="test_btnsalvar">salvar</button>

      <span v-if="carregando">carregando</span>
      <button v-else @click="apagar">apagar</button>
    </div>
  </form>
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
  props: ["entidade", "istimef", "entenome","entidadepai"],
  data() {
    return {
      editando: false,
      ESTADOS,
      Time: {},
      Jogador: {},
    };
  },

  computed: {
    ...mapState(["carregando"]),
    ...mapGetters(["getUltimoEnteId"]),
    incrementaId() {
      if (this.entenome === "Time") return this.getUltimoEnteId("times");

      return this.getUltimoEnteId("jogadores");
    },

    ente_novin() {
      if (this.entenome === "Time") {
        return {
          id: useSheetApi ? "INCREMENT" : this.incrementaId,
          nome: "",
          estado: "",
          tecnico: "",
          torcida: "",
          fundacao_ano: "",
          info: "",
          jogadores:[]
        };
      }
      return {
        id: useSheetApi ? "INCREMENT" : this.incrementaId,
        nome: "",
        camisa: 0,
        salario: "$0.0",
        posicao: "",
      };
    },
  },
  methods: {
    async salvar() {
      let formPayload = {
        time:this.Time,
        jogador:this.Jogador
      }
      /* if(this.entidadepai){
        this.$bus.emit('salvarJogadorNoTime',this.Jogador)
      } */
      if (!this.entidade) { 
        await this.$store.dispatch(
          `criar${this.entenome}`,
          formPayload
        );
        this[this.entenome] = this.ente_novin;
      } else {
        await this.$store.dispatch(`editar${this.entenome}`, {
          original: this.entidade,
          editado: this[this.entenome],
        });
 
      }
      this.$router.push({
        name: "home",
      });
    },
    async apagar(time) {
      await this.$store.dispatch(`apagar${this.entenome}`, this.entidade);

      this.$router.push({
        name: "home",
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
      this[this.entenome] = { ...this.entidade };
    } else {
      this[this.entenome] = this.ente_novin;
    }
    if(this.entidadepai){
      this.Time = this.entidadepai
    }
  } /* ,
  unmounted() {
    this.$bus.off("editar");
  }, */,
};
</script>
