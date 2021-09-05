<template>
  <form v-on:submit.prevent="onSubmit">
    <div>
      <h2 v-if="entidade">Editar {{ entenome }}</h2>
      <h2 v-else>Criar {{ entenome }}</h2>

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
        <CampoDropDown
          nome="estado"
          v-model="Time.estado"
          :itens="ESTADOS"
        ></CampoDropDown>
      </section>
      <v-progress-circular
        v-if="carregando"
        indeterminate
        class="green lighten-5"
      ></v-progress-circular>

      <div v-else>
        <button @click="salvar" id="test_btnsalvar">salvar</button>
        <div v-if="entidade">
          <button @click="apagar">apagar</button>
        </div>
      </div>
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
  props: ["entidade", "istimef", "entenome", "entidadepai"],
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
  },
  methods: {
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
          jogadores: [],
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
    limparEntidade() {
      this.$bus.emit("FormUnselectJogador");
      this[this.entenome] = this.ente_novin();
    },
    handleSalvarEditarEntidadeInterior(payloadEdicao) {
       if (!this.entidade) {
          this.$bus.emit("FormAddJogador", this.Jogador);
          this[this.entenome] = this.ente_novin();
        } else {
          this.$bus.emit("FormEditJogador", payloadEdicao);
        }
    },
    async salvar() {
      let payloadEdicao = {
        original: this.entidade,
        editado: this[this.entenome],
      };
      if (this.entidadepai) { 
        this.handleSalvarEditarEntidadeInterior(payloadEdicao)
        return;
      }

      if (!this.entidade) {
        await this.$store.dispatch(
          `criar${this.entenome}`,
          this[this.entenome]
        );
        this[this.entenome] = this.ente_novin();
      } else {
        await this.$store.dispatch(`editar${this.entenome}`, payloadEdicao);
      }
      this.$router.push({
        name: "home",
      });
    },
    async apagar() {
      await this.$store.dispatch(`apagar${this.entenome}`, this.entidade);

      if (this.entenome !== "Jogador") {
        this.$router.push({
          name: "home",
        });
      }
      this.limparEntidade();
    },

    atualizaEditEntidade() {
      if (this.entidade) {
        this[this.entenome] = { ...this.entidade };
      } else {
        this.limparEntidade();
      }
    },
  },

  watch: {
    entidade: function (novo, velho) {
      this.atualizaEditEntidade();
    },
  },
  mounted() {
    this.atualizaEditEntidade();
    if (this.entidadepai) {
      this.Time = this.entidadepai;
    }
  },
};
</script>
