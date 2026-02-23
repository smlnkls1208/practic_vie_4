<script setup>
import { ref, provide } from 'vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
import SignupForm from '@/components/Auth/SignupForm.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
provide('toast', toast)

const activeTab = ref('login')

const setActiveTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="modal__header">
    <div
      :class="['modal__tab', 'modal__login', { modal__active: activeTab === 'login' }]"
      @click="setActiveTab('login')"
    >
      <span>Вход</span>
    </div>
    <div
      :class="['modal__tab', 'modal__signup', { modal__active: activeTab === 'signup' }]"
      @click="setActiveTab('signup')"
    >
      <span>Регистрация</span>
    </div>
  </div>
  <LoginForm v-if="activeTab === 'login'" />
  <SignupForm v-else @set-active-tab="setActiveTab" />
</template>

<style scoped>
.modal__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 60px;
}

.show-block {
  display: none;
}

.modal__message {
  padding: 0 20px;
  margin-top: 30px;
}

.modal__message p {
  text-align: center;
  width: 100%;
  border: 2px solid #70953e;
  border-radius: 14px;
  background-color: #acd38b;
  padding: 5px 10px;
}

.modal__tab {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e6e6;
  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}

.modal__active {
  background-color: #fff;
  box-shadow: none;
}

.modal__login {
  border-radius: 15px 0 0 0;
}

.modal__signup {
  border-radius: 0 15px 0 0;
}
</style>
