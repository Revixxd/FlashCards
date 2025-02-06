<template>
  <div v-if="gameStates === 'start'">
    <button @click="startGame()">
      Rozpocznij grę
    </button>
  </div>
  <div v-else-if="gameStates === 'playing'">
    <div>
      <div>
        <div class="flashcard" @click="updateFlashCardValue()">
          {{ currentFlashCardValue }}
        </div>
      </div>
      <div v-if="currentFlashCardState === 'back'">
        <button @click="buttonAction('correct')">
          Zgadłem
        </button>
        <button @click="buttonAction('incorrect')">
          nie zgadłem
        </button>
      </div>
    </div>
  </div>
  <div v-else-if="gameStates === 'summary'">
    <div>
      <div>
        Poprawne: {{ summary.correct }}
      </div>
      <div>
        Niepoprawne: {{ summary.incorrect }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flashcard } from '../../../../services/makeRequest/flashCards.types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useFlashCardsSet from '../../../../utils/useFlashCardsSet/useFlashCardSet'

type GameStates = 'start' | 'playing' | 'summary'
type FlashCardState = 'front' | 'back'
interface Summary {
  correct: number
  incorrect: number
}
// IDEA: refactor to useFlashCardGame
const route = useRoute()
const gameStates = ref<GameStates>('start')
const { userFlashCardsSet } = useFlashCardsSet(route.params.id)
const currentFlashCard = ref<Flashcard>()
const currentFlashCardState = ref<FlashCardState>()
const currentFlashCardValue = ref<string | null>()
const currentFlashCardNumber = ref<number>(0)
const summary = ref<Summary>({
  correct: 0,
  incorrect: 0,
})

function startGame() {
  gameStates.value = 'playing'
}

function updateFlashCardValue() {
  if (currentFlashCardState.value === 'front') {
    currentFlashCardValue.value = currentFlashCard.value?.backName
    currentFlashCardState.value = 'back'

    return
  }
  if (currentFlashCardState.value === 'back') {
    if (currentFlashCardNumber.value === userFlashCardsSet.value.flashcards.length - 1) {
      gameStates.value = 'summary'

      return
    }

    currentFlashCardNumber.value += 1
    currentFlashCard.value = userFlashCardsSet.value.flashcards[currentFlashCardNumber.value]
    currentFlashCardState.value = 'front'
  }
}

function buttonAction(buttonAction: 'correct' | 'incorrect') {
  if (buttonAction === 'correct') {
    summary.value.correct += 1
  }
  if (buttonAction === 'incorrect') {
    summary.value.incorrect += 1
  }

  updateFlashCardValue()
}

watch(userFlashCardsSet, () => {
  if (userFlashCardsSet.value) {
    currentFlashCard.value = userFlashCardsSet.value.flashcards[0]
    if (currentFlashCard.value) {
      currentFlashCardValue.value = currentFlashCard.value.frontName
      currentFlashCardState.value = 'front'
    }
  }
})
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
