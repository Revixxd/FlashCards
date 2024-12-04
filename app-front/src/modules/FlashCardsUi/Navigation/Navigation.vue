<template>
  <nav>
    <RouterLink v-for="(route, key) in routes" :key="key" :to="route.path">
      {{ route.name }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { routes } from '@src/routes'
import { RouterLink } from 'vue-router'
</script>

<style scoped>

</style>
