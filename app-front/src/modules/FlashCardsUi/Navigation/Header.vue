<template>
  <header class="header">
    <div class="header__element">
      <font-awesome-icon :icon="['fas', 'bars']" class="icon__hamburger" @click="toggleNavbar" />
      <font-awesome-icon :icon="['fas', 'layer-group']" class="icon__logo" />
    </div>
    <div class="header__element">
      <input
        v-model="searchQuery"
        type="text"
        class="search__input"
        placeholder="Search..."
        @input="onSearch"
      >
    </div>
    <div class="header__element">
      <font-awesome-icon :icon="['fas', 'square-plus']" class="icon__plus" />
      <button class="profil__upgrade profil">
        upgrade
      </button>
      <font-awesome-icon :icon="['fas', 'user']" class="profil__img profil" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { provide } from 'vue'

let toggled = false
function toggleNavbar() {
  toggled = !toggled
}
provide('toggled', toggled)
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.header {
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  background-color: $background-color;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .header__element {
    display: flex;
    align-items: center;
    justify-self: center;
  }

}

.profil {
  margin: 0 16px 0 0;
  cursor: pointer;
}

.profil__img {
  width: 30px;
  height: 30px;
  margin-right: 30px;
}

.search__input {
  background-color: $primary-color;
  max-width: 550px;
  min-width: 250px;
  height: 38px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  color: $text-color;
  outline: none;

}

.icon__hamburger {
  width: 20px;
  height: 20px;
  margin: 0 16px 0 0;
  cursor: pointer;
}

.icon__plus {
  width: 30px;
  height: 30px;
  margin: 0 16px 0 0;
  color: $color-light;
}
.icon__logo {
  width: 30px;
  height: 30px;
  margin: 0 0 0 10px;
  cursor: pointer;
  color: $color-light;
}

@media (max-width: 600px) {
  .search__input {
    display: none;
  }

}
</style>
