<template>
  <div v-if="gameStates === 'start'" class="play">
    <div class="play__box">
      <button @click="startGame()" class="play__box__btn">
        Start Game
      </button>
    </div>
  </div>
  <div v-else-if="gameStates === 'playing'" class="play">
    <div class="flashCard">
        <div @click="updateFlashCardValue()" class="flashCard__value">
          {{ currentFlashCardValue }}
        </div>
      <div v-if="currentFlashCardState === 'back'" class="flashCard__box">
        <button @click="buttonAction('correct')" class="flashCard__box--correct">
          Correct
        </button>
        <button @click="buttonAction('incorrect')" class="flashCard__box--incorrect">
          Incorrect
        </button>
      </div>
    </div>
  </div>
  <div v-else-if="gameStates === 'summary'" class="summary" >
    <div class="summary__box">
        <h3 class="summary__box--correct">
          Correct: {{ summary.correct }}
        </h3>
        <h3 class="summary__box--incorrect">
          Incorrect: {{ summary.incorrect }}
        </h3>
      <div class="summary__btn">
        <button @click="reloadPage" class="summary__btn--retry">Retry</button>
        <RouterLink :to="{ name: 'library' }" class="summary__btn--exit">Exit</RouterLink>
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

function reloadPage() {
  gameStates.value = 'start';
  currentFlashCardNumber.value = 0;
  summary.value.correct = 0;
  summary.value.incorrect = 0;

  // Resetowanie pierwszej karty
  if (userFlashCardsSet.value) {
    currentFlashCard.value = userFlashCardsSet.value.flashcards[0];
    if (currentFlashCard.value) {
      currentFlashCardValue.value = currentFlashCard.value.frontName;
      currentFlashCardState.value = 'front';
    }
  }
}

</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";


.play {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  &__box {
    width: 600px;
    height: 400px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-color;

    &__btn {
      width: 100px;
      height: 70px;
      border-radius: 10px;
      cursor: pointer;
      border: none;
      font-size: 20px;
      color: $text-color;
      background-color: $secondary-background-color;
    }
  }
}

.flashCard {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__value {
    width: 600px;
    height: 400px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-color;
    font-size: 25px;
  }
  &__box {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    &--correct,
    &--incorrect {
    width: 120px;
    height: 50px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
    border: none;
    }
    &--correct {
    background-color: $correct-answer-color; 
    color: $text-color;

      &:hover {
      background-color: darken($correct-answer-color, 10%);
      transform: scale(1.05);
      }
    }
    &--incorrect {
    background-color: $accent-color;
    color: $text-color;

    &:hover {
      background-color: darken($accent-color, 10%);
      transform: scale(1.05);
    }
  }
  }
}

.summary {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background-color: transparent;
  &__box {
    width: 600px;
    height: 400px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: $primary-color;
    font-size: 25px;
    font-weight: bold;
    gap: 20px;

  &--correct {
    color: $correct-answer-color; 
    
  }

  &--incorrect {
    color: $accent-color; 
  }
}
}

.summary__btn {
  display: flex;
  gap: 20px;
  margin-top: 20px;

  &--retry,
  &--exit {
    width: 150px;
    height: 50px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
    border: none;
  }

  &--retry {
    background-color: $color-light; 
    color: $text-color;

    &:hover {
      background-color: darken($color-light, 10%);
      transform: scale(1.05);
    }
  }

  &--exit {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-light; 
    color: $text-color;

    &:hover {
      background-color: darken($color-light, 10%);
      transform: scale(1.05);
    }
  }
}
</style>
