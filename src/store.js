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
    jogador_criar(state, [time, jogador]) {
      debugger
      let refTimeState = state.times.find(tme => tme.id === time.id)
      if (!refTimeState.jogadores || !Array.isArray(refTimeState.jogadores)) {
        refTimeState.jogadores = []
      }
      refTimeState.jogadores.push(jogador)
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
    adicionar_time_jogador(state, [idtime, jogador]) {

      let timeatual = state.times.filter(time => time.id === idtime)[0]
      if (!timeatual.jogadores) {
        timeatual.jogadores = []
      }
      timeatual.jogadores.push(jogador)
    },
    ente_mutacao_generica(state, [mutacao, entenome, ente]) {
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
    async adicionarJogadorAoTime({ commit }, [idtime, jogador]) {
      commit('adicionar_time_jogador', [idtime, jogador])
    },
    async criarJogador({ commit }, timeEjogador) {
      commit('carregando')
      if (useSheetApi) {
        await axios.post(
          `${baseUrlApi_jogadores}`,
          { data: [jogador] }
        )

      }
      debugger
      commit('jogador_criar', timeEjogador)

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
