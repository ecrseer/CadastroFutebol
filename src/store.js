import { createStore } from 'vuex'
import { baseUrlApi_times, useSheetApi, baseUrlApi_jogadores } from './const'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const meuDataStore = createPersistedState({
  paths: ["times", "jogadores"]
})

const store = createStore({
  state() {  // equivalente ao data de um componente
    return {
      carregando: false,
      times: [{
        "id": "1",
      }],
      jogadores: [{
        "id": "1",
      }]
    }
  },
  getters: { // equivalente ao computed de um componente

    getTimePorId(state, idtimeRota) {
      let timeFiltrado = state.times.filter(
        (time) => Number(time.id) === idtimeRota
      )[0];
    },
    getUltimoEnteId(state) {
      return function (entenome) {
        let lastposi = state[entenome].length - 1
        if (!entenome) {
          return;
        }
        let novoid = Number(state[entenome][lastposi].id) + 2;
        console.log(`novoid eh ${novoid}`)
        return novoid + "";
      }

    }
  },
  mutations: { // altera o state
    carregando(state) {
      state.carregando = true
    },
    nao_carregando(state) {
      state.carregando = false
    },
    jogador_carregado(state, jogadoress) {
      state.jogadores = jogadoress
      state.carregando = false
    },
    jogador_criar(state, jogador) {
      state.jogadores.push(jogador)
      state.carregando = false
    },
    time_carregado(state, times) {
      state.times = times
      state.carregando = false
    },
    time_apagar(state, time) {
      //let index = state.times.indexOf(time)
      let times_timeapagado = state.times.filter(timestate => timestate.id !== time.id)
      state.times = times_timeapagado;
      state.carregando = false
    },
    time_editar(state, { original, editado }) {
      Object.assign(original, editado)
      state.carregando = false
    },
    time_criar(state, time) {
      state.times.push(time)
      state.carregando = false
    }
  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {
      commit('carregando')
      console.log(` t do array eh ${this.state.times.length}`)
      if (this.state.times.length < 2) {
        axios.get(`${baseUrlApi_times}`).then(({ data }) => {
          let realData = data;
          if (baseUrlApi_times.indexOf('json') != -1) {
            realData = data.times
          }
          commit('time_carregado', realData)
        })
      }
      if (this.state.jogadores.length < 2) {
        axios.get(`${baseUrlApi_jogadores}`).then(({ data }) => {
          let realData = data;
          if (baseUrlApi_jogadores.indexOf('json') != -1) {
            realData = data.jogadores
          }
          commit('jogador_carregado', realData)
        })
      }

      commit('nao_carregando')

    },
    async criarJogador({ commit }, jogador) {
      commit('carregando')
      if (useSheetApi) {
        await axios.post(
          `${baseUrlApi_jogadores}`,
          { data: [jogador] }
        )

      }
      commit('jogador_criar', jogador)

    },
    async apagarTime({ commit }, time) {
      commit('carregando')
      if (useSheetApi) {
        await axios.delete(`${baseUrlApi_times}/id/${time.id}`)

      }
      commit('time_apagar', time)


    },
    async criarTime({ commit }, time) {
      commit('carregando')
      if (useSheetApi) {
        await axios.post(
          `${baseUrlApi_times}`,
          { data: [time] }
        )

      }
      commit('time_criar', time)

    },
    async editarTime({ commit }, { original, editado }) {
      commit('carregando')
      if (useSheetApi) {
        await axios.put(
          `${baseUrlApi_times}/id/${original.id}`,
          { data: [editado] }
        )

      }

      commit('time_editar', { original, editado })
    }

  },
  plugins: [meuDataStore]
})

export default store
