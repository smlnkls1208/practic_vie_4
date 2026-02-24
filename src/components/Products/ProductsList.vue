<script setup>
import Card from '@/components/Products/ProductsItem.vue'

defineProps({
  products: {
    type: Array
  }
})
</script>

<template>
  <h2 class="card-list__title">
    <slot></slot>
  </h2>
  <div class="card-list">
    <Card v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<style scoped>
.card-list__title {
  font-size: 32px;
  margin: 0 0 30px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 15px 20px;
}
</style>
