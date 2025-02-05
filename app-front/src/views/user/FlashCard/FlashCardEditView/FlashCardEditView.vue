<template>
  <div>
    <p>{{ requestError }} </p>
    <div>
      <p>Nazwa setu fiszek: {{ flashCardSet?.flashcardName }}</p>
    </div>
    <div class="flashcards-container">
      <p>Fiszki:</p>
      <div>
        <button @click="createFlashCard()" />
      </div>
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
        <button @click="removeTemporaryFlashCard(flashcard._id)">
          Usuń fiszke
        </button>
      </div>
    </div>
    <button @click.prevent="resetForm">
      Reset
    </button>
    <button @click.prevent="addTempFlashCard()">
      Dodaj fiszke
    </button>
    <button @click.prevent="saveFlashcardSet()">
      Zapisz set fiszek
    </button>
  </div>
</template>

<script setup lang="ts">
import type { FlashcardSetLong } from '../../../../services/makeRequest/flashCards.types'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useFlashCards from '../../../../utils/useFlashCards/useFlashCards'

// IDEA: refactor useFlashCards to make it more reusable (useFlashCardsSet)
const { getUserFlashCardsSet, updateFlashcardSet, requestError, createFlashcardSet } = useFlashCards()
const flashCardSet = ref<FlashcardSetLong>()
const formFlashCardSet = ref<FlashcardSetLong>()
const route = useRoute()
const router = useRouter()
// TODO: fix route params types
const flashcardId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

async function saveFlashcardSet() {
  if(formFlashCardSet.value) {
    if (flashcardId === 'new') {
      await createFlashcardSet(formFlashCardSet.value?.flashcardName)
        .then((newFlashCardSetID) => {
          if (newFlashCardSetID) {
            getUserFlashCardsSet(newFlashCardSetID)
            .then(() => {
              router.push({
                name: 'flashcard-edit',
                params: { newFlashCardSetID },
              })
            })
          }
        })
    }
    else {
      if (formFlashCardSet.value) {
        await updateFlashcardSet(flashcardId, formFlashCardSet.value.flashcards)
          .then(() => {
            getUserFlashCardsSet(flashcardId)
              .then((res) => {
                flashCardSet.value = res
                formFlashCardSet.value = JSON.parse(JSON.stringify(flashCardSet.value))
              })
          })
      }
    }
  }
}

function addTempFlashCard() {
  if (formFlashCardSet.value) {
    formFlashCardSet.value.flashcards.push({
      _id: 'temp',
      frontName: '',
      backName: '',
    })
  }
}

function resetForm() {
  if (flashCardSet.value) {
    formFlashCardSet.value = JSON.parse(JSON.stringify(flashCardSet.value))
  }
}
function removeTemporaryFlashCard(flashcardId: string) {
  if (formFlashCardSet.value) {
    formFlashCardSet.value.flashcards = formFlashCardSet.value.flashcards.filter(flashcard => flashcard._id !== flashcardId)
  }
}

onMounted(async () => {
  if (flashcardId === 'new') {
    formFlashCardSet.value = {
      _id: 'temp',
      flashcardName: 'Nowa fiszka',
      userId: 'temp',
      flashcards: [
        {
          _id: 'temp',
          frontName: 'New frontName ',
          backName: 'New BackName',
        },
      ],
    }
  }
  else {
    const flashcardSetResponse = await getUserFlashCardsSet(flashcardId)

    if (flashcardSetResponse) {
      flashCardSet.value = flashcardSetResponse
      formFlashCardSet.value = JSON.parse(JSON.stringify(flashCardSet.value))
    }
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
