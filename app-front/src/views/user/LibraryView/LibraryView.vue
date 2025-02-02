<template>
  <div>
    <div v-for="flashcardsSet in flashcardsSetList" :key="flashcardsSet._id">
      nazwa setu: {{ flashcardsSet.flashcardName }}
      <div v-for="flashcard in flashcardsSet.flashcards" :key="flashcard._id">
        fiszka: {{ flashcard.frontName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlashcardSet } from '../../../services/makeRequest/flashCards.types'
import { onMounted, ref } from 'vue'
import useFlashCards from '../../../utils/useFlashCards/useFlashCards'

const { getFlashCardsSets } = useFlashCards()

const flashcardsSetList = ref<FlashcardSet[]>([])

onMounted(async () => {
  await getFlashCardsSets()
    .then((res) => {
      flashcardsSetList.value = res
    })
})
</script>

<style scoped>

</style>
