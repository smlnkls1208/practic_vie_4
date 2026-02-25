<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="orders__item">
    <h3 class="orders__item-title">Заказ №{{ props.index + 1 }}</h3>
    <p class="orders__item-text">{{ props.order.products.length }}</p>
    <p class="orders__item-text">{{ props.order.order_price }} руб.</p>
  </div>
</template>

<style scoped>
.orders__item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  gap: 10px;
  width: 100%;
  border-top: 2px solid #f3f3f3;
  padding: 20px;
}
</style>
