<template>
  <div class="appWrapper">
    <Header />
    <!-- <Navigation /> -->
    <RouterView class="content" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '../../../modules/user/Header/Header.vue'
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
