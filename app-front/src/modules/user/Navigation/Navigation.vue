<template>
  <nav class="nav" :class="{ 'nav--hidden': store.toggled }">
    <RouterLink
      v-for="(routeElement, key) in routesList()"
      :key="key"
      :to="{ name: routeElement.name }"
      class="nav__link"
      active-class="active"
    >
      <li class="nav__list">
        <div class="nav__list__element">
          <font-awesome-icon :icon="getIcon(routeElement.name)" class="nav__icon" />
          {{ routeElement.name }}
        </div>
      </li>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import routes from '@src/routes'
import { RouterLink } from 'vue-router'
import { navbarView } from '../../../store/MainStore.js'

const store = navbarView()

function getIcon(routeName: string) {
  switch (routeName) {
    case 'flashcard':
      return ['fas', 'home']
    case 'dashboard':
      return ['fas', 'folder-open']
    case 'library':
      return ['fas', 'book']
    default:
      return ['fas', 'question']
  }
}

function routesList() {
  const app = routes.find((route: routes) => route.name === 'app')
  const appChildren = app?.children

  return [
    ...appChildren,
  ]
}
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

  &--hidden {
    transform: translateX(-100%);
  }
}
.nav__list__element {
  width: 100%;
  border-radius: 8px;
  padding: 5px 16px 5px 8px;
  color: $text-color;
}
.active  {
  .nav__list__element {
    background-color: $primary-color;
  }
}
</style>
