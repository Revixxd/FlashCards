<template>
  <div class="flashcards">
    <p>{{ requestError }} </p>
    <div class="flashcards--container">
      <h2 class="flashcards--container__title" >Set name: {{ flashCardSet?.flashcardName }}</h2>
      <p>Flash Cards:</p>
      <div>
        <button @click="createFlashCard()" class="btn">Create set </button>
      </div>
      <div v-for="flashcard in formFlashCardSet?.flashcards" :key="flashcard._id" class="flashcard">
        <form class="flashcard--form">
          <div class="form--element">
            <label :for="`${flashcard._id} ` + `frontName`">Question</label>
            <input v-model="flashcard.frontName" :name="`${flashcard._id} ` + `frontName`" type="text" class="flashcard__input">
          </div>
          <div class="form--element">
            <label :for="`${flashcard._id} ` + `backName`">Answer</label>
            <input v-model="flashcard.backName" :name="`${flashcard._id} ` + `backName`" type="text" class="flashcard__input">
          </div>
        </form>
        <button @click="removeTemporaryFlashCard(flashcard._id)" class="btn">
         Remove Flash Card
        </button>
      </div>
      <div class="flashcards--btn">
          <button @click.prevent="resetForm" class="btn">
            Reset
          </button>
          <button @click.prevent="addTempFlashCard()" class="btn">
            Add Flash Card
          </button >
          <button @click.prevent="saveFlashcardSet()" class="btn">
            Save set
          </button>
      </div>
    </div>
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
  if (formFlashCardSet.value) {
    if (flashcardId === 'new') {
      await createFlashcardSet(formFlashCardSet.value?.flashcardName)
        .then((newFlashCardSetID) => {
          if (newFlashCardSetID) {
            router.push({
              name: 'flashcard-edit',
              params: { id: newFlashCardSetID },
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

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.flashcards--container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title {
    padding: 30px;
  }

}

.flashcard {
  padding: 10px;
  border-radius: 5px;

  &__input {
  background-color: $input-color; 
  border: 1px solid $secondary-color;
  color: $text-color;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  width: 400px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
&--form {
  display: flex;
  flex-direction: column;
  gap: 10px;

}

}
.form--element {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.btn {
  background-color: $secondary-color; 
  color: $text-color;
  border: none;
  margin: 10px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
}
.btn:hover {
  background-color: $input-color; 
}
</style>
