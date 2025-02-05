<template>

  <div class="auth">
    <form @submit.prevent="formSubmit" class="auth__form">
      <h1 class="auth__title">Login to FlashCards</h1>

      <p class="auth__label">Enter your username</p>
      <input type="text" v-model="formData.usernameOrEmail" name="username" class="auth__input" required />

      <p class="auth__label">Enter your password</p>
      <input type="password" v-model="formData.password" name="password" class="auth__input" required />

      <button type="submit" class="auth__button">
        Login
      </button>

      <p v-if="requestError" class="error-text">{{ requestError.message }}</p>

      <p class="toggle__text">
        Don't have an account?
        <button type="button" @click="goToRegister" class="toggle__button">
          Register
        </button>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLogin from '../../../utils/useLogin/useLogin'
import type { LoginProps } from '../../../services/makeRequest/makeRequest.types'
import { useRouter } from 'vue-router';

const formData = ref<LoginProps>({
  usernameOrEmail: '',
  password: '',
})
const { login, requestError } = useLogin()
const router = useRouter();
function formSubmit() {
    login(formData.value)
}
const goToRegister = () => {
  router.push('/register');
};
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
    text-align: center;
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
    width: 90%;
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
</style>
