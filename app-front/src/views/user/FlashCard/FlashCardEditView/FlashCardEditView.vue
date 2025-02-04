<template>
  <div>
    <p>{{ requestError }} </p>
    <pre>
      <code>
        {{ flashCardSet }}
      </code>
    </pre>
    <div>
      <p>Nazwa setu fiszek: {{ flashCardSet?.flashcardName }}</p>
    </div>
    <div class="flashcards-container">
      <p>Fiszki:</p>
      <div v-for="flashcard in flashCardSet?.flashcards" :key="flashcard._id" class="flashcard">
        <div class="flashcard__front">
          {{ flashcard.frontName }}
        </div>
        <div class="flashcard__back">
          {{ flashcard.backName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlashcardSet } from '../../../../services/makeRequest/flashCards.types'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useFlashCards from '../../../../utils/useFlashCards/useFlashCards'

const { getUserFlashCardsSet, requestError } = useFlashCards()
const flashCardSet = ref<FlashcardSet | null>(null)
const route = useRoute()

onMounted(async () => {
  // TODO: fix route params types
  const flashcardId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  const flashcardSetResponse = await getUserFlashCardsSet(flashcardId)

  if (flashcardSetResponse) {
    flashCardSet.value = flashcardSetResponse
  }
})

watch(requestError, (newError) => {
  console.error(newError.message)
})
</script>

<style scoped>

</style>
