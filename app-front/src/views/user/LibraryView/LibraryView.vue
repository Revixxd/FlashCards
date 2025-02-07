<template>
  <div v-if="userFlashCardsList.length !== 0" class="flashcard-set">
    <div class="flashcard-set__element">
      <RouterLink :to="{ name: 'flashcard-edit', params: { id: 'new' } }" class="rout">
        <font-awesome-icon :icon="['fas', 'plus']" class="flashcard-set__element-icon" />
        <button class="flashcard-set__element-btn">Add new set</button>
      </RouterLink>
    </div>
    <div v-for="flashcard in userFlashCardsList" :key="flashcard._id" class="flashcard-set__element">
      <h3 class="flashcard-set__element-title">Set name: {{ flashcard.flashcardName }}</h3>
      <RouterLink :to="{ name: 'flashcard-edit', params: { id: flashcard._id } }">
        <button class="flashcard-set__element-btn">Edit</button>
      </RouterLink>
      <button @click="deleteFlashcardSet(flashcard._id)" class="flashcard-set__element-btn">
        Remove
      </button>
      <RouterLink :to="{ name: 'flashcard-play', params: { id: flashcard._id } }">
        <button class="flashcard-set__element-btn">start learning</button>
      </RouterLink>
    </div>
  </div>
  
  <div v-else class="">
    <RouterLink :to="{ name: 'flashcard-edit', params: { id: 'new' } }">
        <button>Add first set</button>
      </RouterLink>
  </div>
</template>

<script setup lang="ts">
import useFlashCards from '../../../utils/useFlashCards/useFlashCards'

const { userFlashCardsList, deleteFlashcardSet } = useFlashCards()
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.flashcard-set {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 100vh;
  background-color: $background-color;
  padding: 20px;
  
  &__element {
    background-color: $primary-color;
    border-radius: 10px;
    padding: 15px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
    }

    &-icon {
      margin: 20px;
      width: 70px;
      height: 70px;
    }
  
    &-title {
      font-size: 18px;
      color: $text-color;
      margin-bottom: 10px;
    }
  
    &-btn {
      background-color: $secondary-color;
      color: $text-color;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
      
      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
  }
}

.rout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
