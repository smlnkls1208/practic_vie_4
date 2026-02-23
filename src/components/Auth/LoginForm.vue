<script setup>
import Button from '@/components/UI/AppButton.vue'
import { inject } from 'vue'
import axios from 'axios'
import store from '@/store/store.js'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    login: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup
      .string()
      .required('Пароль обязателен')
      .min(6, 'Пароль должен быть не менее 6 символов')
  })
})

const [loginEmail, emailAttrs] = defineField('login')
const [loginPassword, passwordAttrs] = defineField('password')

const closeModal = inject('closeModal')

const toast = inject('toast')

const submitLogin = handleSubmit(async (values) => {
  try {
    const { data } = await axios.post(`${store.state.API_URL}login`, {
      email: values.login,
      password: values.password
    })
    toast.success('Вы успешно вошли в аккаунт!')

    store.dispatch('login', data.data.user_token)

    closeModal()
  } catch (err) {
    console.error(err)
    toast.error(err.message)
  } finally {
    loginEmail.value = loginPassword.value = ''
  }
})
</script>

<template>
  <form class="modal__form modal__form-login" @submit.prevent="submitLogin">
    <label class="modal__label"
      >Логин
      <input
        class="modal__input"
        placeholder="Email"
        v-model="loginEmail"
        v-bind="emailAttrs"
        :class="{ invalid__input: errors.login, valid__input: !errors.login && loginEmail }"
      />
      <span class="modal__errors" v-if="errors.login">{{ errors.login }}</span>
    </label>
    <label class="modal__label"
      >Пароль
      <input
        class="modal__input"
        placeholder="Пароль"
        type="password"
        v-model="loginPassword"
        v-bind="passwordAttrs"
        :class="{
          invalid__input: errors.password,
          valid__input: !errors.password && loginPassword
        }"
      />
      <span class="modal__errors" v-if="errors.password">{{ errors.password }}</span>
    </label>
    <Button :disabled="Object.keys(errors).length > 0" class="modal__button">Войти</Button>
  </form>
</template>

<style scoped>
.modal__form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.modal__label {
  display: flex;
  gap: 5px;
  flex-direction: column;
}

.modal__input {
  width: 100%;
  padding: 10px;
  background-color: #f6f6f6;
  border: 1px solid #0005;
  border-radius: 14px;
}

.modal__button {
  margin-top: 10px;
}

.modal__errors {
  color: #e6122c;
  font-size: 14px;
}

.invalid__input {
  outline: 1px solid red;
}

.valid__input {
  outline: 1px solid #9dd458;
}
</style>
