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

    getEntePorId(state) {
      return function (entenome, idEnte) {

        let enteFiltrado = state[entenome].filter(
          (ente) => Number(ente.id) === Number(idEnte))[0];
        return enteFiltrado;
      }
    },
    getUltimoEnteId(state) {
      return function (entenome) {
        let lastposi = state[entenome].length - 1

        let novoid = Number(state[entenome][lastposi].id) + 2;
        return novoid + "";
      }

    },
    getTodosJogadoresNoTime(){},
    getJogadoresDisponiveis(state) {
      return function () {
        let jogadoresIndisponiveis = new Set()

        state.times.forEach(time => {
          if (time.jogadores) {
            jogadoresIndisponiveis.add(...time.jogadores)
          }
        })

        let jogadoresDisponiveis = new Set(state.jogadores)

        for (let jogador of jogadoresIndisponiveis) {
          jogadoresDisponiveis.delete(jogador)
        } 
        
        let arrJogadoresDisponiveis = [...jogadoresDisponiveis]

        return arrJogadoresDisponiveis;

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
    jogador_criarnotime(state, [time, jogador]) {
      let indx = state.times.indexOf(time)
      if(indx>=0){
        if(!Array.isArray(state.times[indx].jogadores)){
          state.times[indx]=[]
        }
        state.times[indx].jogadores.push(jogador)        
      }

      state.carregando = false
    },
    time_carregado(state, times) {

      state.times = times
      state.carregando = false
    },
    time_apagar(state, time) {
      
      let indx = state.times.indexOf(time)
      if(indx>=0){
        state.times.splice(indx,1)
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
    },
    referencia_jogador_time(state) {

      for (const time of state.times) {

        let idJogadoresDevemSerReferenciados = []
        if (time.jogadores) {
          time.jogadores.forEach(jogador =>
            idJogadoresDevemSerReferenciados.push(jogador.id))

        }
        if (idJogadoresDevemSerReferenciados >= 1) {
          time.jogadores = []
          for (const idsJogador of idJogadoresDevemSerReferenciados) {
            let refJogadorState = state.jogadores.filter(jogador => jogador.id === idsJogador)[0]
             
            time.jogadores.push(refJogadorState)
          } console.log(`time.jogadores agora eh ${time.jogadores}`)
        }

      }

    }, 
    ente_mutacao_generica(state, [mutacao, entenome, ente]) {
      /* state[entepai].indexOf(ente)
      state[entepai][entenome]  */
      if (mutacao === 'criar') {
        state[entenome].push(ente)
      }
      if (mutacao === 'editar') {
        let { original, editado } = ente
        Object.assign(original, editado)
      }
      if (mutacao === 'apagar') {
        let entestate_enteapagado = state[entenome].filter(entestate => entestate.id !== ente.id)
        state[entenome] = entestate_enteapagado;

        let indx = state[entenome].indexOf(ente)
        if(indx>=0){
          state[entenome].splice(indx,1)
        }

      }


      state.carregando = false
    }

  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {

      commit('carregando')

      if (this.state.jogadores.length < 2) {
        axios.get(`${baseUrlApi_jogadores}`).then(({ data }) => {
          let realData = data;
          if (baseUrlApi_jogadores.indexOf('json') != -1) {
            realData = data.jogadores
          }
          commit('jogador_carregado', realData)
        })
      }
      if (this.state.times.length < 2) {
        axios.get(`${baseUrlApi_times}`).then(({ data }) => {
          let realData = data;
          if (baseUrlApi_times.indexOf('json') != -1) {
            realData = data.times
          }
          commit('time_carregado', realData)
        })
      }
      commit('nao_carregando')

    },
    async criarJogador({ commit }, timeEjogador) {
      commit('carregando')
      if (useSheetApi) {
        await axios.post(
          `${baseUrlApi_jogadores}`,
          { data: [jogador] }
        )

      } 
      commit('jogador_criarnotime', timeEjogador)

    },
    async editarJogador({ commit }, { original, editado }) {
      commit('carregando')
      if (useSheetApi) {
        await axios.put(
          `${baseUrlApi_times}/id/${original.id}`,
          { data: [editado] }
        )

      }
      commit('ente_mutacao_generica', ['editar', 'jogadores', { original, editado }])

    },
    async apagarTime({ commit }, time) {
      commit('carregando')
      if (useSheetApi) {
        await axios.delete(`${baseUrlApi_times}/id/${time.id}`)

      }
      commit('time_apagar', time)


    },
    async criarTime({ commit }, [time,_]) {
      commit('carregando')
      if (useSheetApi) {
        await axios.post(
          `${baseUrlApi_times}`,
          { data: [time] }
        )

      }
      commit('ente_mutacao_generica', ['criar', 'times', time])

    },
    async editarTime({ commit }, { original, editado }) {
      commit('carregando')
      if (useSheetApi) {
        await axios.put(
          `${baseUrlApi_times}/id/${original.id}`,
          { data: [editado] }
        )

      }
      commit('ente_mutacao_generica', ['editar', 'times', { original, editado }])

    }

  },
  plugins: [meuDataStore]
})

export default store
