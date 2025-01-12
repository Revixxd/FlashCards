<template>
  <div>
    <Navigation />
    <input type="text" placeholder="Username/email" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@FlashCardsUi/Navigation/Navigation.vue'
import { LoginProps, POSTRequestEnum } from '../../../services/makeRequst.ts/makeRequest.types'
import { ref } from 'vue'
import { makeRequest } from '../../../services/makeRequst.ts/makeRequest'
const username = ref('')
const password = ref('')

function login() {
  const data:LoginProps = {
    usernameOrEmail: username.value,
    password: password.value,
  }
  makeRequest('POST', POSTRequestEnum.LOGIN, data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped>

</style>