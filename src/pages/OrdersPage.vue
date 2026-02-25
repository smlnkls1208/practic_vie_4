<script setup>
import store from '@/store/store.js'
import axios from 'axios'
import OrdersList from '@/components/Orders/OrdersList.vue'
import { onMounted, ref } from 'vue'

const orders = ref([])
const isLoading = ref(false)

const getOrders = async () => {
  try {
    const response = await axios.get(`${store.state.API_URL}order`, {
      headers: {
        Authorization: `Bearer ${store.state.userToken}`
      }
    })

    orders.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  try{
    isLoading.value = true

    await getOrders()
  }catch(error){

  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <OrdersList :is-loading="isLoading" :orders="orders">Оформленные заказы</OrdersList>
</template>

<style scoped></style>
