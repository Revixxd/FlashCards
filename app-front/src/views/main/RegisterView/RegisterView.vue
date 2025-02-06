<template>
  <div>
    <div class="auth">
      <form class="auth__form" @submit.prevent="formSubmit">
        <h1>Register to flashcards</h1>

        <p class="auth__label">
          Enter your username
        </p>
        <input v-model="formData.username" type="text" name="username" class="auth__input" required>
        <p v-if="errors.username" class="error-text">
          {{ errors.username }}
        </p>

        <p class="auth__label">
          Enter your email
        </p>
        <input v-model="formData.email" type="text" name="email" class="auth__input" required>
        <p v-if="errors.email" class="error-text">
          {{ errors.email }}
        </p>

        <p class="auth__label">
          Enter your password
        </p>
        <div class="password-wrapper">
          <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" name="password" class="auth__input" required>
          <span class="password--toggle" @click="togglePasswordVisibility('password')">
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </span>
        </div>
        <p v-if="errors.password" class="error-text">
          {{ errors.password }}
        </p>

        <p class="auth__label">
          Confirm your password
        </p>
        <div class="password--wrapper">
          <input v-model="confirmedPassword" :type="showConfirmPassword ? 'text' : 'password'" name="confirmedPassword" class="auth__input" required>
          <span class="password--toggle" @click="togglePasswordVisibility('confirmPassword')">
            <font-awesome-icon :icon="showConfirmPassword ? 'eye' : 'eye-slash'" />
          </span>
        </div>
        <p v-if="errors.confirmedPassword" class="error-text">
          {{ errors.confirmedPassword }}
        </p>

        <button type="submit" class="auth__button">
          Register
        </button>

        <p v-if="requestError" class="error-text">
          {{ requestError.message }}
        </p>

        <p class="toggle__text">
          Already have an account?
          <button type="button" class="toggle__button" @click="goToLogin">
            Login
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RegisterProps } from '../../../services/makeRequest/makeRequest.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useRegister from '../../../utils/useRegister/useRegister'

const router = useRouter()
const formData = ref<RegisterProps>({
  username: '',
  email: '',
  password: '',
})
const confirmedPassword = ref('')
const { register, requestError } = useRegister()
const errors = ref<{ username?: string, email?: string, password?: string, confirmedPassword?: string }>({})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePasswordVisibility(field: 'password' | 'confirmPassword') {
  if (field === 'password')
    showPassword.value = !showPassword.value
  if (field === 'confirmPassword')
    showConfirmPassword.value = !showConfirmPassword.value
}

async function validateForm() {
  errors.value = {}

  if (!formData.value.username || formData.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters long'
  }

  const emailPattern = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  if (!formData.value.email.match(emailPattern)) {
    errors.value.email = 'Enter a valid email address with "@"'
  }

  if (formData.value.password.length < 8 || !/[A-Z]/.test(formData.value.password) || !/[\W_]/.test(formData.value.password)) {
    errors.value.password = 'Password must be at least 8 characters long and contain at least one uppercase letter and special character'
  }

  if (confirmedPassword.value !== formData.value.password) {
    errors.value.confirmedPassword = 'Passwords must match'
  }

  return Object.keys(errors.value).length === 0
}

async function formSubmit() {
  const isValid = await validateForm()
  if (isValid) {
    await register(formData.value)
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: $background-color;

  &__form {
    width: 400px;
    padding: 20px;
    background: $secondary-background-color;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba($text-color, 0.1);
  }

  &__title {
    color: $text-color;
    font-size: 24px;
    margin-bottom: 15px;
  }

  &__label {
    color: $secondary-color;
    margin: 5px 0;
    text-align: left;
    font-weight: bold;
  }

  &__input {
    width: 85%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid $secondary-color;
    background-color: lighten($primary-color, 10%);
    color: $text-color;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &::placeholder {
      color: darken($secondary-color, 10%);
    }

    &:focus {
      border-color: $color-light;
    }
  }

  &__button {
    width: 50%;
    padding: 10px;
    background-color: $color-light;
    color: $text-color;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background-color: darken($color-light, 10%);
    }
  }
}

.toggle {
  &__text {
    margin-top: 10px;
    color: lighten($secondary-color, 20%);
  }

  &__button {
    background: none;
    border: none;
    color: $color-light;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      text-decoration: underline;
      color: lighten($color-light, 20%);
    }
  }
}

.error-text {
  color: $accent-color;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
}
.password--toggle {
  cursor: pointer;
  margin-left: 10px;
}
</style>
