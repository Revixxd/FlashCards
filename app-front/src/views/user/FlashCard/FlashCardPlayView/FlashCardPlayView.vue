<template>
  <div v-if="userFlashCardsSet">
    <div v-for="flashcard in userFlashCardsSet.flashcards" :key="flashcard._id" class="flashcard">
      <div>
        {{ flashcard.frontName }}
      </div>
      <div>
        {{ flashcard.backName }}
      </div>
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useFlashCardsSet from '../../../../utils/useFlashCardsSet/useFlashCardSet'

const route = useRoute()
const { userFlashCardsSet } = useFlashCardsSet(route.params.id)
</script>

<style scoped>
.flashcard {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
</style>
