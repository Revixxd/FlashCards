<template>
  <nav class="nav">
    <RouterLink
      v-for="(routePath, key) in routes"
      :key="key"
      :to="route.path"
      class="nav__link"
      active-class="active"
    >
      <li class="nav__list" :class="[{ 'nav__list--active': isActive(routePath.name) }]">
        <font-awesome-icon :icon="getIcon(routePath.name)" class="nav__icon" />
        {{ route.name }}
      </li>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import routes from '@src/routes'
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const selectedRoute = ref<string | null>(null)
const route = useRoute()

function isActive(routeName: string) {
  return selectedRoute.value === routeName
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

  &__list {
    width: 200px;
    height: 40px;
    display: flex;
    justify-self: start;
    align-items: center;
    padding: 0 16px 0 8px;
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
    &--hidden {
    transform: translateX(-100%);
  }
}

@media (max-width: 600px) {
  .nav {
    display: none;
  }
}

.nav--hidden {
  display: block;
}
</style>
