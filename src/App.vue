<script setup>
import { ref } from 'vue'
import MyHeader from '@/components/landings/AppHeader.vue'
import Drawer from '@/components/UI/AppDrawer.vue'
import Modal from '@/components/UI/AppModal.vue'
import LoginModal from '@/components/Auth/LoginModal.vue'

const modalLoginVisible = ref(false)
const drawerVisible = ref(false)

const showLoginModal = () => {
  modalLoginVisible.value = true
}

const showDrawer = () => {
  drawerVisible.value = true
}
</script>

<template>
  <div id="app">
    <div class="container">
      <MyHeader @show-login-modal="showLoginModal" @show-drawer="showDrawer" />
      <router-view></router-view>
      <Modal v-model:show="modalLoginVisible">
        <LoginModal />
      </Modal>
      <Drawer v-model:show="drawerVisible" />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 15px;
  min-height: calc(100vh - 120px);
}

a {
  text-decoration: none;
  color: #5c5c5c;
  transition: 0.3s;
}

a:hover {
  color: #9dd458;
}
</style>
