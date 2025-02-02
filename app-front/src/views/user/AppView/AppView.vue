<template>
  <div class="appWrapper">
    <Header />
    <Navigation />
    <RouterView class="content"/>
  </div>
</template>

<script setup lang="ts">
import Header from '../../../modules/user/Header/Header.vue'
import Navigation from '../../../modules/user/Navigation/Navigation.vue'
import { RouterView } from 'vue-router'
</script>


<style scoped lang="scss">
@import "@src/styles/variables.scss";

.appWrapper {
  background-color: $background-color;
  color: $text-color;
}
.content {
  background-color: $primary-color;
}
</style>