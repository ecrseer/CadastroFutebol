import { createStore } from 'vuex'
import { baseUrlApi, useSheetApi } from './const'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const meuDataStore = createPersistedState({
  paths: ["times", "jogadores"]
})

const store = createStore({
  state() {  // equivalente ao data de um componente
    return {
      carregando: false,
      times: [],
      jogadores: []
    }
  },
  getters: { // equivalente ao computed de um componente
    getUltimoId(state) {
      return function (codigo) {
        let lastposi = arr.length-1
        let id=state.times[lastposi].id;
        return id+1;
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
    time_carregado(state, times) {
      state.times = times
      state.carregando = false
    },
    time_apagar(state, time) {
      let index = state.times.indexOf(time)
      if (index >= 0) {
        state.times.splice(index, 1)
      }
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
      if (this.state.times.length===0) {
        axios.get(`${baseUrlApi}`).then(({ data }) => {
          let realData = data;
          if (baseUrlApi.indexOf('json') != -1) {
            realData = data.times
          }
          commit('time_carregado', realData)
        })
      }

      commit('nao_carregando')

    },
    async apagarTime({ commit }, time) {
      commit('carregando')
      if (useSheetApi) {
        await axios.delete(`${baseUrlApi}/id/${time.id}`)

      }
      commit('time_apagar', time)

    },
    async criarTime({ commit }, time) {
      commit('carregando')
      if (useSheetApi) {  
        await axios.post(
          `${baseUrlApi}`,
          { data: [time] }
        )

      }
      commit('time_criar', time)

    },
    async editarTime({ commit }, { original, editado }) {
      commit('carregando')
      if (useSheetApi) {
        await axios.put(
          `${baseUrlApi}/id/${original.id}`,
          { data: [editado] }
        )

      }

      commit('time_editar', { original, editado })
    }

  },
  plugins: [meuDataStore]
})

export default store
