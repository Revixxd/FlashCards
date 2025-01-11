<template>
  <nav class="nav">
    <RouterLink
      v-for="(route, key) in routes"
      :key="key"
      :to="route.path"
      class="nav__link"
      active-class="active"
    >
      <li :class="['nav__list', { 'nav__list--active': isActive(route.name) }]">
        <font-awesome-icon :icon="getIcon(route.name)" class="nav__icon" />
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

watch(route, (newRoute) => {
  selectedRoute.value = newRoute.name
})

selectedRoute.value = route.name

const getIcon = (routeName: string) => {
  console.log(routeName)
  switch (routeName) {
    case 'Home':
      return ['fas', 'home']
    case 'Dashboard':
      return ['fas', 'folder-open']
    case 'Login':
      return ['fas', 'sign-in-alt']
    default:
      return ['fas', 'question']
  }
}
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.nav {
  width: 225px;
  padding: 8px 24px 0 0;
  position: fixed;
  top: 80px; 
  bottom: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;

  &__list {
    width: 200px;
    height: 40px;
    display: flex;
    justify-self: start;
    align-items: center;
    padding: 0 16px 0 8px;
    box-sizing: border-box;
  }
  
  &__icon {
    width: 20px;
    height: 20px;
    margin: 0 16px 0 0;
  }

  &__list--active {
    border-radius: 10px;
    background-color: $primary-color;
    padding: 0 16px 0 8px;
    color: $text-color;
  }
}
</style>