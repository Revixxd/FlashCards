<template>
  <div>
    <input v-model="formData.username" type="text" placeholder="Username">
    <input v-model="formData.password" type="password" placeholder="Password">
    <input v-model="formData.email" type="email" placeholder="Email">
    <button @click="formSubmit">
      Register
    </button>
    <p v-if="requestError">
      {{ requestError.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { RegisterProps } from '../../../services/makeRequest/makeRequest.types'
import { ref } from 'vue'
import useRegister from '../../../utils/useRegister/useRegister'

const formData = ref<RegisterProps>({
  username: '',
  email: '',
  password: '',
})

const { register, requestError } = useRegister()

function formSubmit() {
  register(formData.value)
}
</script>

<style scoped>

</style>
