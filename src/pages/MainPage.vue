<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '@/components/Products/ProductsList.vue'
import store from '@/store/store.js'

const products = ref([])
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true

    const response = await axios.get(store.state.API_URL + 'products')
    products.value = response.data.data

    isLoading.value = false

    if (store.state.isAuthenticated) {
      await store.dispatch('basketStore/updateProductsInBasket')
    }
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <CardList :products="products"> Каталог товаров</CardList>
  <h2 v-if="isLoading">Загрузка...</h2>
</template>

<style scoped></style>
