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
import type { LoginProps } from '../../../services/makeRequst/makeRequest.types'
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

</style>
