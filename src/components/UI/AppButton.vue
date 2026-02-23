<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  width: 100%;
  padding: 15px;
  color: #fff;
  background-color: #9dd458;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;
}

.button:hover {
  scale: 1.02;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button:disabled:hover {
  scale: none;
  box-shadow: none;
}
</style>
