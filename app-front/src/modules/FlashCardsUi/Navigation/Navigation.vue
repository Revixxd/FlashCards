<template>
    <nav>
        <RouterLink v-for="(route, key) in routes" :to="route.path" :key="key"> {{ route.name }}</RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { routes } from '@src/routes';

</script>

<style scoped>

</style>