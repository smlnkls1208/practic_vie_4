import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const basketStore = {
  namespaced: true,
  state() {
    return {
      productsInBasket: []
    }
  },

  getters: {
    getSummuryPrice(state) {
      return state.productsInBasket.reduce((acc, product) => acc + product.price, 0)
    }
  },

  mutations: {
    setProductsInBasket(state, newValue) {
      state.productsInBasket = newValue
    },

    addProductsToBasket(state, product) {
      state.productsInBasket.push(product)
    },

    removeProductsToBasket(state, product) {
      state.productsInBasket = state.productsInBasket.filter((item) => item.id !== product.id)
    }
  },

  actions: {
    async addProductToAPI({ dispatch, commit, rootState }, productId) {
      try {
        await axios.post(`${rootState.API_URL}cart/${productId}`, null, {
          headers: {
            Authorization: `Bearer ${rootState.userToken}`
          }
        })
        toast.success('Товар успешно добавлен в корзину')

        await dispatch('updateProductsInBasket')
      } catch (error) {
        console.error(error)
        toast.error('Произошла ошибка. Попробуйте снова!')
      }
    },

    async removeProductFromAPI({ dispatch, rootState }, productId) {
      try {
        await axios.delete(`${rootState.API_URL}cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${rootState.userToken}`
          }
        })
        toast.info('Товар удален из корзины')

        await dispatch('updateProductsInBasket')
      } catch (error) {
        console.error(error)
        toast.error('Произошла ошибка. Попробуйте снова!')
      }
    },
    async updateProductsInBasket({ commit, rootState }) {
      try {
        const response = await axios.get(`${rootState.API_URL}cart`, {
          headers: {
            Authorization: `Bearer ${rootState.userToken}`
          }
        })

        commit('setProductsInBasket', response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default basketStore
