<template>
  <div class="dashboard">
    <div>
      <h2>Last sets</h2>
      <ul class="list">
        <li v-for="(flashcard, index) in flashcards" :key="index" class="box">
          <font-awesome-icon :icon="['fas', 'forward']" class="box__icon" />
          <div class="box__info">
            <h3>{{ flashcard.title }}</h3>
            <p class="box__info__text">
              FlashCards {{ flashcard.amount }} terms creator {{ flashcard.creator }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <h2>Sets recommended for you</h2>
      <ul class="list">
        <li v-for="(flashcard, index) in flashcards" :key="index" class="app-content-view">
          <h3 class="app-content-view__title">
            {{ flashcard.title }}
          </h3>
          <p class="app-content-view__description">
            {{ flashcard.amount }} flashcards
          </p>
          <div class="creator">
            <font-awesome-icon :icon="['fas', 'user']" class="creator__img" />
            <p class="creator__name">
              {{ flashcard.creator }}
            </p>
            <span class="creator__role">{{ flashcard.role }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <h2>Popular flashcards</h2>
      <ul class="list">
        <li v-for="(flashcard, index) in flashcards" :key="index" class="app-content-view">
          <h3 class="app-content-view__title">
            {{ flashcard.title }}
          </h3>
          <p class="app-content-view__description">
            {{ flashcard.amount }} flashcards
          </p>
          <div class="creator">
            <font-awesome-icon :icon="['fas', 'user']" class="creator__img" />
            <p class="creator__name">
              {{ flashcard.creator }}
            </p>
            <span class="creator__role">{{ flashcard.role }}</span>
          </div>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const flashcards = reactive([
  {
    title: 'Matematyka',
    amount: 12,
    creator: 'Jan Kowalski',
    role: 'nauczyciel',
    img: 'path/to/image1.jpg',
  },
  {
    title: 'Historia',
    amount: 15,
    creator: 'Anna Nowak',
    role: 'nauczyciel',
    img: 'path/to/image2.jpg',
  },
  {
    title: 'Biologia',
    amount: 10,
    creator: 'Piotr Nowak',
    role: 'uczeń',
    img: 'path/to/image3.jpg',
  },
])
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $background-color;
  color: $text-color;
  max-width: 1300px;
  padding: 0 32px;
  gap: 40px;
  min-height: 90vh;
  margin: 20px 0;
}
.app-content-view {
  min-width: 290px;
  background-color: $primary-color;
  border-radius: 10px;
  margin: 0 16px 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  flex-wrap: wrap;

  &__title {
    font-size: 20px;
    padding-left: 15px;
    margin: 20px 0 10px;
  }
  &__description {
    width: 30%;
    font-size: 12px;
    margin: 15px;
    padding: 5px 0;
    background-color: $secondary-color;
    border-radius: 20px;
    display: block;
    white-space: nowrap;
    text-align: center;

  }

  &:hover {
    border-bottom: 4px solid $secondary-color;
  }
}
.list {
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  margin-top: 15px;
}

.creator {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 5px 15px;

  &__img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding-right: 10px;
  }

  &__name {
    margin-right: 8px;
    font-size: 14px;
  }
  &__role {
    font-size: 14px;
  }
}

.box {
  min-width: 255px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  padding-inline: 15px;
  border-radius: 10px;

  &__icon {
    width: 15px;
    height: 15px;
    padding: 10px;
    background-color: $secondary-color;
    border-radius: 10px;
  }

  &__info {
    margin: 10px;
    &__text {
      margin: 10px;
      font-size: 12px;
    }
  }

  &__info h3 {
    margin-left: 10px;
  }
  &:hover {
    background-color: $secondary-color;
  }
}
</style>
