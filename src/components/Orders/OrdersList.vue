<script setup>
import OrdersItem from '@/components/Orders/OrdersItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div>
    <h2 class="orders__title">
      <router-link to="/">
        <img class="orders__back" src="/src/assets/image/backButton.svg" alt="backButton" />
      </router-link>
      <slot></slot>
    </h2>
    <h2 v-if="isLoading">Загрузка...</h2>
    <div v-else-if="props.orders.length !== 0">
      <div class="orders__names-cols">
        <p class="orders__name-text">Номер заказа</p>
        <p class="orders__name-text">Количество товаров</p>
        <p class="orders__name-text">Общая стоимость</p>
      </div>
      <div class="orders__list">
        <OrdersItem
          v-for="(order, index) in props.orders"
          :key="order.id"
          :order="order"
          :index="index"
        />
      </div>
    </div>
    <h2 v-else class="orders__title orders__empty-text">У вас еще нет оформленных заказов</h2>
  </div>
</template>

<style scoped>
.orders__title {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 32px;
  margin: 0 0 30px;
}

.orders__back {
  position: relative;
  top: 4px;
  opacity: 20%;
  transition: opacity 0.3s;
}

.orders__back:hover {
  opacity: 100%;
}

.orders__names-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0 20px;
}

.orders__name-text {
  color: #5c5c5c;
}

.orders__list {
  display: grid;
  margin-bottom: 20px;
}

.orders__empty-text {
  margin-top: 30vh;
  justify-content: center;
}
</style>
