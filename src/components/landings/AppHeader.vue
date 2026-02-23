<script setup>
import { defineEmits, ref } from 'vue'
import store from '@/store/store.js'
import Modal from '@/components/UI/AppModal.vue'
import Button from '@/components/UI/AppButton.vue'
import router from '@/router/router.js'
import { useToast } from 'vue-toastification'

const toast = useToast()

const isShowConfirmModal = ref(false)

const emit = defineEmits(['showLoginModal', 'showDrawer'])

const showLoginModal = () => {
  emit('showLoginModal')
}

const showDrawer = () => {
  emit('showDrawer')
}

const logout = async () => {
  try {
    await store.dispatch('logout')
    isShowConfirmModal.value = false
    router.replace('/')
    toast.info('Вы вышли из аккаунта')
  }catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <header class="header">
    <router-link to="/">
      <h1 class="header__logo logo">Просто купить</h1>
    </router-link>
    <nav class="header__nav" v-if="store.state.isAuthenticated">
      <a class="header__link" @click.prevent="showDrawer"
        ><b>{{ store.getters['basketStore/getSummuryPrice'] }} руб.</b></a
      >
      <router-link to="/orders"><b>Заказы</b></router-link>
      <router-link to="" class="header__link" @click="isShowConfirmModal = true"
        ><b>Выйти</b></router-link
      >
    </nav>
    <nav class="header__nav" v-else>
      <a class="header__link" @click.prevent="showLoginModal"><b>Войти</b></a>
    </nav>
    <modal v-model:show="isShowConfirmModal">
      <div class="modal">
        <h2 class="modal__title">Вы уверены?</h2>
        <div class="modal__buttons">
          <Button class="modal__btn modal__btn-empty" @click.prevent="logout">Да</Button>
          <Button class="modal__btn" @click="isShowConfirmModal = false">Нет</Button>
        </div>
      </div>
    </modal>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eaeaea;
  width: 100%;
  padding: 20px 0;
  margin-bottom: 40px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 30px;
  color: #5c5c5c;
  cursor: pointer;
  transition: 0.3s;
}

.header__link {
  cursor: pointer;
}

h1 {
  color: #1c1c1c;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  height: 100%;
}

.modal__title {
  text-align: center;
}

.modal__buttons {
  display: flex;
  width: 90%;
  gap: 20px;
}

.modal__btn-empty {
  background-color: transparent;
  border: 1px solid #9dd458;
  color: #9dd458;
}
</style>
