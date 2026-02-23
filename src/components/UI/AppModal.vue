<script setup>
import { defineEmits, provide } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show'])

const closeModal = () => {
  emit('update:show', false)
}

provide('closeModal', closeModal)
</script>

<template>
  <div class="modal" v-if="props.show" @click="closeModal">
    <div @click.stop class="modal__content">
      <img class="modal__cross" src="/src/assets/image/cross.svg" @click="closeModal" alt="cross"/>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
}

.modal__content {
  position: relative;
  margin: auto;
  z-index: 100;
  background: white;
  border-radius: 15px;
  min-height: 300px;
  max-width: 520px;
  width: 100%;
}

.modal__cross {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  z-index: 20;
  opacity: 20%;
  transition: opacity 0.3s;
}

.modal__cross:hover {
  opacity: 80%;
}
</style>
