<template>
  <div class="appWrapper">
    <Navigation />
    <Header />
    <div id="user-app">
      <RouterView class="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '../../../modules/user/Header/Header.vue'
import Navigation from '../../../modules/user/Navigation/Navigation.vue'

</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.appWrapper {
  background-color: $background-color;
  color: $text-color;
  display: flex;
  flex-direction: column;
}
.content {
  background-color: $primary-color;
}
</style>
