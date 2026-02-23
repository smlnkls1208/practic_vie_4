<script setup>
import Button from '@/components/UI/AppButton.vue'
import { defineEmits, inject } from 'vue'
import axios from 'axios'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import store from '@/store/store.js'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    fio: yup.string().required('ФИО обязателен'),
    login: yup.string().email('Некорректный email').required('Email обязателен'),
    password: yup
      .string()
      .required('Пароль обязателен')
      .min(6, 'Пароль должен быть не менее 6 символов')
  })
})

const [signupFio, fioAttrs] = defineField('fio')
const [signupEmail, emailAttrs] = defineField('login')
const [signupPassword, passwordAttrs] = defineField('password')

const emit = defineEmits(['setActiveTab'])

const setActiveTab = (tab) => {
  emit('setActiveTab', tab)
}

const toast = inject('toast')

const submitSignup = handleSubmit(async (values) => {
  try {
    await axios.post(`${store.state.API_URL}signup`, {
      fio: values.fio,
      email: values.login,
      password: values.password
    })

    toast.success('Вы успешно зарегестрировались! Войдите в аккаунт')

    setActiveTab('login')
  } catch (err) {
    console.error(err)
    toast.error(err.response.data.message)
  } finally {
    signupFio.value = signupEmail.value = signupPassword.value = ''
  }
})
</script>

<template>
  <form class="modal__form modal__form-signup" @submit.prevent="submitSignup">
    <label class="modal__label"
      >ФИО
      <input
        class="modal__input"
        type="text"
        placeholder="Фамилия Имя Отчество"
        v-model="signupFio"
        v-bind="fioAttrs"
        :class="{ invalid__input: errors.fio, valid__input: !errors.fio && signupFio }"
      />
      <span class="modal__errors" v-if="errors.fio">{{ errors.fio }}</span>
    </label>
    <label class="modal__label"
      >Логин
      <input
        class="modal__input"
        placeholder="Email"
        v-model="signupEmail"
        v-bind="emailAttrs"
        :class="{ invalid__input: errors.login, valid__input: !errors.login && signupEmail }"
      />
      <span class="modal__errors" v-if="errors.login">{{ errors.login }}</span>
    </label>
    <label class="modal__label"
      >Пароль
      <input
        class="modal__input"
        type="password"
        placeholder="Пароль"
        v-model="signupPassword"
        v-bind="passwordAttrs"
        :class="{
          invalid__input: errors.password,
          valid__input: !errors.password && signupPassword
        }"
      />
      <span class="modal__errors" v-if="errors.password">{{ errors.password }}</span>
    </label>
    <Button :disabled="Object.keys(errors).length > 0" class="modal__button"
      >Зарегестрироваться</Button
    >
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
