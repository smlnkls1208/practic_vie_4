<script setup>
import Button from '@/components/UI/AppButton.vue'
import DrawerItem from '@/components/UI/DrawerItem.vue'
import store from '@/store/store.js'
import { defineEmits, ref } from 'vue'
import axios from 'axios'
import MyButton from '@/components/UI/AppButton.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const postedOrders = ref(false)
const isLoading = ref(false)
const idOrder = ref(0)

const emit = defineEmits(['update:show'])

const closeDrawer = () => {
  emit('update:show', false)
  postedOrders.value = false
}

const setOrder = async () => {
  try {
    isLoading.value = true

    const response = await axios.post(`${store.state.API_URL}order`, null, {
      headers: {
        Authorization: `Bearer ${store.state.userToken}`
      }
    })
    postedOrders.value = true
    store.commit('basketStore/setProductsInBasket', [])
    idOrder.value = response.data.data.order_id
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="overlay" v-if="props.show" @click="closeDrawer">
    <div class="drawer" v-if="props.show" @click.stop>
      <div class="drawer__header">
        <img class="drawer__back" @click="closeDrawer" src="/src/assets/image/arrow-next.svg" alt="arrow-next.svg" />
        <h2 class="drawer__title">Корзина</h2>
      </div>
      <div class="drawer__info" v-if="isLoading">
        <h2>Загрузка...</h2>
      </div>
      <div
        class="drawer__info"
        v-else-if="store.state.basketStore.productsInBasket.length === 0 && postedOrders"
      >
        <h2>Вы успешно оформили заказ. ID {{ idOrder }}</h2>
        <router-link to="/orders">
          <MyButton class="drawer__info-button" @click="closeDrawer">Перейти к заказам</MyButton>
        </router-link>
      </div>
      <div class="drawer__info" v-else-if="store.state.basketStore.productsInBasket.length === 0">
        <h2>Корзина пуста</h2>
      </div>
      <div class="drawer__content" v-else>
        <div class="drawer__list">
          <transition-group name="drawer-list">
            <DrawerItem
              v-for="product in store.state.basketStore.productsInBasket"
              :key="product.id"
              :product="product"
            />
          </transition-group>
        </div>
        <div class="drawer__bottom">
          <div class="drawer__row">
            <span>Итого:</span>
            <div class="drawer__dash" />
            <span
              ><b>{{ store.getters['basketStore/getSummuryPrice'] }} руб.</b></span
            >
          </div>
          <Button @click="setOrder"> Оформить заказ</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
}

.drawer {
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  padding: 30px;
  height: 100vh;
  width: 400px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.drawer__header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.drawer__back {
  transform: rotate(180deg) translateX(0);
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.3s;
}

.drawer__back:hover {
  opacity: 1;
  transform: rotate(180deg) translateX(4px);
}

.drawer__info {
  text-align: center;
  margin: auto;
}

.drawer__info-button {
  margin-top: 30px;
}

.drawer__content {
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.drawer__list {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.drawer-list-item {
  display: inline-block;
  margin-right: 10px;
}

.drawer-list-enter-active,
.drawer-list-leave-active {
  transition: all 0.4s ease;
}

.drawer-list-enter-from,
.drawer-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.drawer__bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.drawer__row {
  display: flex;
}

.drawer__dash {
  flex-grow: 1;
  border-bottom: 1px dashed #dfdfdf;
}
</style>
