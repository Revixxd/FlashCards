<template>

  <div class="auth">
    <form @submit.prevent="formSubmit" class="auth__form">
      <h1 class="auth__title">{{ isLogin ? 'Login to FlashCards' : 'Register to FlashCards' }}</h1>

      <p class="auth__label">Enter your username</p>
      <input type="text" v-model="formData.usernameOrEmail" name="username" class="auth__input" required />

      <p v-if="!isLogin" class="auth__label">Enter your email</p>
      <input v-if="!isLogin" type="email" v-model="formData.usernameOrEmail" name="username" class="auth__input" required />

      <p class="auth__label">Enter your password</p>
      <input type="password" v-model="formData.password" name="password" class="auth__input" required />
      
      <p v-if="!isLogin" class="auth__label">Confrim your password</p>
      <input v-if="!isLogin" type="password"  v-model="confirmedPassword" name="email" class="auth__input" required />

      <button type="submit" class="auth__button">
        {{ isLogin ? 'Login' : 'Register' }}
      </button>

      <p v-if="requestError" class="error-text">{{ requestError.message }}</p>

      <p class="toggle__text">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button type="button" @click="toggleForm" class="toggle__button">
          {{ isLogin ? 'Register' : 'Login' }}
        </button>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLogin from '../../../utils/useLogin/useLogin'
import type { LoginProps } from '../../../services/makeRequest/makeRequest.types'

const formData = ref<LoginProps>({
  usernameOrEmail: '',
  password: '',
})
const { login, requestError } = useLogin()

const isLogin = ref(true)
const confirmedPassword = ref('')
function toggleForm(){
  isLogin.value = !isLogin.value
}

function formSubmit() {
  if(isLogin.value) {
    login(formData.value)
  } else {
    if(confirmedPassword === formData.value.password) {

    } else {

    }
  }
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

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
