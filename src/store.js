import { createStore } from 'vuex'
import { useSheetApi, baseUrlApi } from './const'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const meuDataStore = createPersistedState({
  paths: ["times", "jogadores"]
})
const achatarArray = (Array2D) => {
  let array1D = []
  for (const linha of Array2D) {
    array1D.push(...linha)
  }
  return array1D;
}
function JSONparseTimeJogadores(timesjson) {
  let timesNoJson = timesjson;

  timesNoJson = timesNoJson.map(
    (time) => {
      if (time.jogadores && typeof time.jogadores === 'string') {
        let listaJogadores = JSON.parse(time.jogadores)
        time.jogadores = listaJogadores
      }
      return time
    }
  ) 
  return timesNoJson;
}

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
        if (entenome === "jogadores") {
          state.carregando = true
          let TodosIds = state.times.map((tme) => {
            if(tme.jogadores){
              return tme.jogadores.map(
                ({ id }) => id
              )
            } return 0

          }
          ) 
          if (!TodosIds[0].toString()) {
            TodosIds = [[1]]
          }
          //TodosIds = achatarArray(TodosIds)

          let maiorId = Math.max(...TodosIds)
          state.carregando = false
          return `${(maiorId + 2)}`
        }
        let lastposi = state[entenome].length - 1

        let novoid = Number(state[entenome][lastposi].id) + 2;
        return `${novoid}`
      }

    },
    getTodosJogadores(state) {
      let arr2Djogadores = state.times.map(({ jogadores }) => jogadores)
      return achatarArray(arr2Djogadores)
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
    jogador_criarnotime(state, [time, jogador]) {
      let indx = state.times.indexOf(time)
      if (indx >= 0) {
        if (!Array.isArray(state.times[indx].jogadores) ||
        state.times[indx].jogadores.length===0) {

          state.times[indx].jogadores = []
          
        }
        state.times[indx].jogadores.push(jogador)
      }

      state.carregando = false
    },
    jogador_apagarnotime(state, jogador) {

      let naoEncontrou = true
      let yy = 0, xx = 0;

      while (naoEncontrou) {
        for (let indjogador = 0; indjogador < state.times[yy].jogadores.length; indjogador++) {

          if (state.times[yy].jogadores[indjogador] === jogador) {
            xx = indjogador
            naoEncontrou = false;
            break;
          }
        }
        if (naoEncontrou) {
          yy++;
        }

      }
 
      state.times[yy].jogadores.splice(xx, 1) 
    },
    ente_mutacao_generica(state, [mutacao, entenome, ente]) {
      /* state[entepai].indexOf(ente)
      state[entepai][entenome]  */
      if (mutacao === 'carregar') {
        state[entenome] = ente

        if (entenome === 'times') {
          state.times = JSONparseTimeJogadores(ente)
        }
      }
      if (mutacao === 'criar') {
        
        state[entenome].push(ente)
      }
      if (mutacao === 'editar') {
        let { original, editado } = ente
        if(!original){
          original = state[entenome].filter(ente=>ente.id===editado.id)[0]
        }
        Object.assign(original, editado)
      }
      if (mutacao === 'apagar') {

        let indx = state[entenome].indexOf(ente)
        if (indx >= 0) {
          state[entenome].splice(indx, 1)
        }

      }


      state.carregando = false
    },

  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {

      commit('carregando')
      
 
       await axios.get(`${baseUrlApi.times}`).then(({ data }) => {
          let timesJson = data;

          if (baseUrlApi.times.indexOf('json') != -1) {
            timesJson = data.times
          } 
          commit('ente_mutacao_generica', ['carregar', 'times', timesJson])
          
        })  
      commit('nao_carregando')

    },

    async apagarTime({ commit }, time) {
      commit('carregando')
      if (useSheetApi) {
        await axios.delete(`${baseUrlApi.times}/id/${time.id}`)

      }
      console.log(`tst${baseUrlApi['jogadores']}`)
      commit('ente_mutacao_generica', ['apagar', 'times', time])


    },
    async acaoDe({ commit }, [acao, entenome, ente]) {


    },
    async criarTime({ commit }, time) {
      commit('carregando')
      commit('ente_mutacao_generica', ['criar', 'times', time])

      if (useSheetApi) {
        await axios.post(
          `${baseUrlApi.times}`,
          { data: [time] }
        ) 

      }

    },
    async editarTime({ commit,state }, { original, editado }) {
      commit('carregando')
      commit('ente_mutacao_generica', ['editar', 'times', { original, editado }])
      editado = state.times.filter(tme=>tme.id===editado.id)[0]
      
      if (useSheetApi) {
        let strinTime=editado
        if(!editado.jogadores || editado.jogadores.length===0){
          strinTime.jogadores="[]"
        }
        await axios.put(
          `${baseUrlApi.times}/id/${editado.id}`,
          { data: [strinTime] }
        )

      }

    },
    async criarJogador({ commit }, timeEjogador) {
      commit('carregando')
      let [time,jogador] = timeEjogador
           
      commit('jogador_criarnotime', timeEjogador) 

      if (useSheetApi) {
        await axios.put(
          `${baseUrlApi.times}/id/${time.id}`,
          { data: [time] }
        )

      }


    },
    async editarJogador({ commit }, { original, editado }) {
      commit('carregando')
      commit('ente_mutacao_generica', ['editar', 'jogadores', { original, editado }])
      
    },
    async apagarJogador({ commit }, {time,jogador}) {
      commit('carregando')
      commit('jogador_apagarnotime', jogador)

      if (useSheetApi) {
        let strinTime=time
        if(!time.jogadores || time.jogadores.length===0){
          strinTime.jogadores="[]"
        }
        await axios.put(`${baseUrlApi.times}/id/${time.id}`,
        {data:[strinTime]})

      }
      commit('nao_carregando')


    },

  },
  plugins: [meuDataStore]
})

export default store
