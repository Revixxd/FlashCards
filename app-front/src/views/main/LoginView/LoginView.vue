<template>
  <div>
    <input v-model="formData.usernameOrEmail" type="text" placeholder="Username/email">
    <input v-model="formData.password" type="password" placeholder="Password">
    <button @click="formSubmit">
      Login
    </button>
    <p v-if="requestError">
      {{ requestError.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { LoginProps } from '../../../services/makeRequest/makeRequest.types'
import { ref } from 'vue'
import useLogin from '../../../utils/useLogin/useLogin'

const formData = ref<LoginProps>({
  usernameOrEmail: '',
  password: '',
})

const { login, requestError } = useLogin()

function formSubmit() {
  login(formData.value)
}
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.auth__form {
  width: 400px;
  padding: 20px;
  background: #1E1E30;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.auth__title {
  color: white;
  font-size: 24px;
  margin-bottom: 15px;
}

.auth__label {
  color: #aaa;
  margin: 5px 0;
  text-align: left;
}

.auth__input {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #555;
  background-color: #2B2B40;
  color: white;
  border-radius: 5px;
  outline: none;
}

.auth__input::placeholder {
  color: #888;
}

.auth__button {
  width: 30%;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.auth__button:hover {
  background-color: #2563eb;
}

.toggle__text {
  margin-top: 10px;
  color: #bbb;
}

.toggle__button {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
}

.toggle__button:hover {
  text-decoration: underline;
}
</style>
