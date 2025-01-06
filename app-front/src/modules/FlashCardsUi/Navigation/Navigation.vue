<template>
  <nav>
    <RouterLink
      v-for="(route, key) in routes"
      :key="key"
      :to="route.path"
    >
      <li :class="['nav_list', { 'active': isActive(route.name) }]">
        <img class="nav_list_icon" src="" alt="">
        {{ route.name }}
      </li>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { routes } from '@src/routes'
import { RouterLink, useRoute } from 'vue-router'

const selectedRoute = ref<string | null>(null)
const route = useRoute()

const isActive = (routeName: string) => {
  return selectedRoute.value === routeName
}

// Watch for route changes
watch(route, (newRoute) => {
  selectedRoute.value = newRoute.name
})

// Ustawienie początkowej wartości selectedRoute
selectedRoute.value = route.name
</script>

<style scoped lang="scss">
@import "../../../styles/variables.scss";


nav {
  width: 225px;
  padding: 8px 24px 0 0;
  position: fixed;
  top: 80px; 
  bottom: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
}

.nav_list {
  width: 200px;
  height: 40px;
  display: flex;
  justify-self: start;
  align-items: center;
  padding: 0 16px 0 8px;
  box-sizing: border-box;
}

.nav_list_icon {
  width: 20px;
  height: 20px;
  margin: 0 16px 0 0;
}

.nav_list.active {
  border-radius: 10px;
  background-color: $primary-color;
  padding: 0 16px 0 8px;
  color: $text-color;
}
</style>