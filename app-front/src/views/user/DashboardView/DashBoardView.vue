<template>
  <div class="dashboard">
    <Header />
    <Navigation />
    <div class="test">
      <h2>Last sets</h2>
        <ul class="list">
          <li v-for="(flashcard, index) in flashcards" :key="index" class="box">
              <font-awesome-icon :icon="['fas', 'forward']" class="box__icon"/>
            <div class="box__info">
              <h3>{{ flashcard.title }}</h3>
              <p class="box__info__text">FlashCards set {{ flashcard.amount }} terms creator {{ flashcard.creator }}</p>
            </div>
          </li>
        </ul>
    </div>
    <div class="">
      <h2>Sets recomended for you</h2>
        <ul class="list">
          <li v-for="(flashcard, index) in flashcards" :key="index" class="content">
            <h3 class="content__title">{{ flashcard.title }}</h3>
            <p class="content__description">{{ flashcard.amount }} flashcards</p>
            <div class="creator">
              <font-awesome-icon :icon="['fas', 'user']" class="creator__img" />
              <p class="creator__name">{{ flashcard.creator }}</p>
              <span class="creator__role">{{ flashcard.role }}</span>
            </div>
          </li>
        </ul>
    </div>
    <div class="">
      <h2>Popural flashcards</h2>
        <ul class="list">
          <li v-for="(flashcard, index) in flashcards" :key="index" class="content">
            <h3 class="content__title">{{ flashcard.title }}</h3>
            <p class="content__description">{{ flashcard.amount }} flashcards</p>
            <div class="creator">
              <font-awesome-icon :icon="['fas', 'user']" class="creator__img" />
              <p class="creator__name">{{ flashcard.creator }}</p>
              <span class="creator__role">{{ flashcard.role }}</span>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Navigation from '@FlashCardsUi/Navigation/Navigation.vue';
import Header from '@FlashCardsUi/Navigation/Header.vue';

const flashcards = reactive([
  {
    title: 'Matematyka',
    amount: 12,
    creator: 'Jan Kowalski',
    role: 'nauczyciel',
    img: 'path/to/image1.jpg'
  },
  {
    title: 'Historia',
    amount: 15,
    creator: 'Anna Nowak',
    role: 'nauczyciel',
    img: 'path/to/image2.jpg'
  },
  {
    title: 'Biologia',
    amount: 100,
    creator: 'Piotr Wiśniewski',
    role: 'uczeń',
    img: 'path/to/image3.jpg'
  }
]);
</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.dashboard {
  background-color: $background-color;
  color: $text-color;
  max-width: 1300px;
  margin: 80px auto 0 230px;
  padding: 0 32px;
}
.content {
  min-width: 290px;
  height: 156px;
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
    margin-left: 15px;
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
    margin: 0 20px 0 0;
    padding: 10px;
    background-color: $secondary-color;
    border-radius: 10px;
  }

  &__info {

    &__text {
      font-size: 14px;
    }
  }
  &:hover {
    background-color: $secondary-color;
  }
}

@media (max-width: 700px) {
  .dashboard {
    margin: 80px auto 0;
    padding: 0 30px;
  }
  .list {
    padding-inline: auto;
  }
}
</style>
