<template>
  <div class="header">
    <div class="header_left">
      <button class="header_left_humburger">hunburger</button>
      <img src="" alt="" class="header_left_logo"></img>
    </div>
    <div class="header_middle_search">
      <input
        v-model="searchQuery"
        type="text"
        class="search_input"
        placeholder="Search..."
        @input="onSearch"
      />
    </div>
    <div class="header_right">
      <button class="header_right_add">+</button>
      <button class="header_right_upgrade">upgrade</button>
      <img src="" alt="" class="header_right_profil">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<style scoped lang="scss">
@import "../../../styles/variables.scss";

.header {
  width: 100%;
  height: 40px;
  margin: 12px 16px;
  display: flex;
  justify-content: space-between;
  background-color: $background-color;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header_right, .header_middle_search, .header_left {
  display: flex;
  align-items: center;
  justify-self: center;
}

.header_right_add, .header_right_upgrade, .header_right_profil {
  margin: 0 16px 0 0;
}

.header_right_profil {
  width: 40px;
  height: 40px;
  background-color: $primary-color;
  border-radius: 50%;
}

.search_input {
  background-color: $primary-color;
  max-width: 550px;
  min-width: 260px;
  height: 38px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  color: $text-color;
  outline: none;
  box-sizing: border-box;
}
</style>