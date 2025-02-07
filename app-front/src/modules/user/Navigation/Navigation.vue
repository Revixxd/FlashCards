<template>
  <nav class="nav" :class="{ 'nav--hidden': store.toggled }">
    <RouterLink
      v-for="(routeElement, key) in route"
      :key="key"
      :to="routeElement"
      class="nav__link"
      active-class="active"
    > 
       <li class="nav__list" :class="[{ 'nav__list--active': isActive(route.name) }]" @click.prevent="">
        <font-awesome-icon :icon="getIcon(route.name)" class="nav__icon" />
        {{route.name}}
      </li>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navbarView } from '../../../store/MainStore.js'


const store = navbarView()
const selectedRoute = ref<string | null>(null)
const route = useRoute()

function isActive(routeName: string) {
  return route.name === routeName
}

watch(route, (newRoute) => {
  selectedRoute.value = newRoute.name
})

selectedRoute.value = route.name

function getIcon(routeName: string) {
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
onMounted(() => {
  console.log('Routes:', route, selectedRoute.value)
})
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.nav {
  width: 225px;
  padding: 8px 24px 0 0;
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding-top: 20px;
  background-color: $background-color;
  transition: transform 0.3s ease-in-out;

  &__list {
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 16px 0 8px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
  }

  &__list--active {
    border-radius: 10px;
    background-color: $primary-color;
    padding: 0 16px 0 8px;
    color: $text-color;
  }

  &--hidden {
    transform: translateX(-100%);
  }
}
</style>
