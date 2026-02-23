<script setup>
import store from '@/store/store.js'
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const quantity = ref(1)

const incrementCount = () => {
  quantity.value++
}

const dincrementCount = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
</script>

<template>
  <div class="drawer__item">
    <div class="drawer__counter">
      <img @click="incrementCount" class="drawer__counter-btn drawer__plus" src="/src/assets/image/plus.svg" />
      <p class="drawer__count">{{ quantity }}</p>
      <img @click="dincrementCount" class="drawer__counter-btn drawer__minus" src="/src/assets/image/minus.svg" />
    </div>
    <div class="drawer__content">
      <p class="drawer__content-title">{{ props.product.name }}</p>
      <p class="drawer__price">
        <b>{{ props.product.price * quantity }} руб.</b>
      </p>
    </div>
    <div
      class="drawer__cross"
      @click="store.dispatch('basketStore/removeProductFromAPI', props.product.id)"
    >
      <img src="/src/assets/image/close.svg" />
    </div>
  </div>
</template>

<style scoped>
.drawer__item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  max-width: 325px;
  transition: all 0.3s;
}

.drawer__item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.drawer__counter {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-right: 20px;
  align-items: center;
  justify-content: space-between;
}

.drawer__counter-btn {
  opacity: 20%;
  transition: opacity 0.3s;
}

.drawer__counter-btn:hover {
  opacity: 80%;
}

.drawer__content-title {
  max-width: 155px;
}

.drawer__price {
  margin-top: 8px;
}

.drawer__cross {
  position: absolute;
  right: 15px;
  opacity: 20%;
  transition: opacity 0.3s;
}

.drawer__cross:hover {
  opacity: 80%;
}
</style>
