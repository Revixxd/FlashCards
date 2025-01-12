<template>
  <div class="nav-container">
    <strong>Current route path:</strong> {{ $route.fullPath }}
    <nav>
      <RouterLink v-for="(route, key) in routes" :key="key" :to="route.path">
        {{ route.name }}
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import routes from '../../../routes'
</script>

<style scoped>
.nav-container {
  nav {
    display: flex;
    gap: 1rem;
  }
}
</style>
