<template>
  <div v-if="userFlashCardsList.length !== 0" class="flashcard-set">
    <div class="flashcard-set__element">
      <RouterLink :to="{ name: 'flashcard-edit', params: { id: 'new' } }">
        <button>dodaj nowy set</button>
      </RouterLink>
    </div>
    <div v-for="flashcard in userFlashCardsList" :key="flashcard._id" class="flashcard-set__element">
      <p>nazwa setu: {{ flashcard.flashcardName }}</p>
      <RouterLink :to="{ name: 'flashcard-edit', params: { id: flashcard._id } }">
        <button>edytuj</button>
      </RouterLink>
      <button @click="deleteFlashcardSet(flashcard._id)">
        usun
      </button>
      <RouterLink :to="{ name: 'flashcard-play', params: { id: flashcard._id } }">
        <button>rozpocznij nauke</button>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <p>loading</p>
  </div>
</template>

<script setup lang="ts">
import useFlashCards from '../../../utils/useFlashCards/useFlashCards'

const { userFlashCardsList, deleteFlashcardSet } = useFlashCards()
</script>

<style scoped>
.flashcard-set {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  .flashcard-set__element {
    background-color: red;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
