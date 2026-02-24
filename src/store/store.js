import { createStore } from 'vuex'
import basketStore from '@/store/BasketStore.js'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      API_URL: 'http://lifestealer86.ru/api-shop/',
      isAuthenticated: localStorage.isAuthenticated
        ? JSON.parse(localStorage.isAuthenticated)
        : false,
      userToken: localStorage.userToken || ''
    }
  },

  mutations: {
    setAuthentication(state, newValue) {
      state.isAuthenticated = newValue
      localStorage.isAuthenticated = newValue
    },
    setUserToken(state, token) {
      state.userToken = token
      localStorage.userToken = token
    }
  },

  actions: {
    async login({ commit }, token) {
      commit('setAuthentication', true)
      commit('setUserToken', token)
      await store.dispatch('basketStore/updateProductsInBasket')
    },

    async logout({ state, commit }) {
      try {
        await axios.get(`${state.API_URL}logout`, {
          headers: {
            Authorization: `Bearer ${state.userToken}`
          }
        })

        commit('setAuthentication', false)
        commit('setUserToken', '')
      } catch (error) {
        console.error(error)
      }
    }
  },

  modules: {
    basketStore
  }
})

export default store
