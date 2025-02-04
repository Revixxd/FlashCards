<template>
  <div class="flashcard-set">
    <div v-for="flashcardsSet in flashcardsSetList" :key="flashcardsSet._id" class="flashcard-set__element">
      nazwa setu: {{ flashcardsSet.flashcardName }}
      <div v-for="flashcard in flashcardsSet.flashcards" :key="flashcard._id">
        fiszka: {{ flashcard.frontName }}
      </div>
      <RouterLink :to="{ name: 'flashcard-edit', params: { id: flashcardsSet._id } }">
        <button>edytuj</button>
      </RouterLink>
      <RouterLink :to="{ name: 'flashcard-play', params: { id: flashcardsSet._id } }">
        <button>rozpocznij nauke</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlashcardSet } from '../../../services/makeRequest/flashCards.types'
import { onMounted, ref } from 'vue'
import useFlashCards from '../../../utils/useFlashCards/useFlashCards'

const { getUserFlashCardsList } = useFlashCards()

const flashcardsSetList = ref<FlashcardSet[]>([])

onMounted(async () => {
  await getUserFlashCardsList()
    .then((res) => {
      flashcardsSetList.value = res
    })
})
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
