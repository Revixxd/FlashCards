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
      <div v-for="flashcard in formFlashCardSet?.flashcards" :key="flashcard._id" class="flashcard">
        <form class="flashcard-form">
          <div class="form-element">
            <label :for="`${flashcard._id} ` + `frontName`">Pytanie</label>
            <input v-model="flashcard.frontName" :name="`${flashcard._id} ` + `frontName`" type="text">
          </div>
          <div class="form-element">
            <label :for="`${flashcard._id} ` + `backName`">Odpowiedz</label>
            <input v-model="flashcard.backName" :name="`${flashcard._id} ` + `backName`" type="text">
          </div>
        </form>
      </div>
    </div>
    <button @click.prevent="resetForm">
      Reset
    </button>
    <button @click.prevent="saveFlashcardSet">
      Zapisz set fiszek
    </button>
  </div>
</template>

<script setup lang="ts">
import type { FlashcardSet } from '../../../../services/makeRequest/flashCards.types'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useFlashCards from '../../../../utils/useFlashCards/useFlashCards'

const { getUserFlashCardsSet, updateFlashcardSet, requestError } = useFlashCards()
const flashCardSet = ref<FlashcardSet>()
const formFlashCardSet = ref<FlashcardSet>()
const route = useRoute()
// TODO: fix route params types
const flashcardId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

async function saveFlashcardSet() {
  if (formFlashCardSet.value) {
    await updateFlashcardSet(flashcardId, formFlashCardSet.value.flashcards)
      .then((res) => {
        getUserFlashCardsSet(flashcardId)
          .then((res) => {
            flashCardSet.value = res
            formFlashCardSet.value = JSON.parse(JSON.stringify(flashCardSet.value))
          })
      })
  }
}

function resetForm() {
  if (flashCardSet.value) {
    formFlashCardSet.value = JSON.parse(JSON.stringify(flashCardSet.value))
  }
}0

onMounted(async () => {
  const flashcardSetResponse = await getUserFlashCardsSet(flashcardId)
  if (flashcardSetResponse) {
    flashCardSet.value = flashcardSetResponse
    formFlashCardSet.value = JSON.parse(JSON.stringify(flashCardSet.value))
  }
})

watch(requestError, (newError) => {
  if (newError) {
    // TODO: add proper error handling
    console.error(newError.message)
  }
})
</script>

<style scoped>
.flashcards-container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .flashcard {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;

    .flashcard-form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .form-element {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    }
  }
}
</style>
