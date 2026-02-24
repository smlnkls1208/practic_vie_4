<script setup>
import { computed } from 'vue'
import store from '@/store/store.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const urlImage = computed(() => {
  return `http://lifestealer86.ru/public/${props.product.image}`
})
</script>

<template>
  <div class="card">
    <img :src="urlImage" :alt="product.name" />
    <p class="card__name">{{ product.name }}</p>
    <div class="card__about">
      <div class="card__price">
        <p class="card__price-text">Цена:</p>
        <p class="card__price-number">{{ product.price }} руб.</p>
      </div>
      <div
        @click="store.dispatch('basketStore/addProductToAPI', props.product.id)"
        class="card__plus"
        v-if="store.state.isAuthenticated"
      >
        <img src="/src/assets/image/plus.svg" alt="plus" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #f3f3f3;
  padding: 20px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 14px;
  color: #000;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}

.card > img {
  height: 170px;
  object-fit: contain;
}

.card__about {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.card__price-text {
  font-size: 11px;
  color: #bdbdbd;
}

.card__price-number {
}

.card__plus {
  opacity: 20%;
  transition: opacity 0.3s;
}

.card__plus:hover {
  opacity: 80%;
}
</style>
