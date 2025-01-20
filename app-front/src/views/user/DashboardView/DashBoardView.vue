<template>
  <div class="dashboard-container">
    <Header />
    <Navigation />

    <div class="container">
      <h1>Ostatnie zestawy</h1>
      <div>
        <ul class="list">
          <li v-for="(flashcard, index) in flashcards" :key="index" class="content">
            <h3 class="content__title">{{ flashcard.title }}</h3>
            <p class="content__description">{{ flashcard.amount }} flashcards</p>
            <div class="creator">
              <img :src="flashcard.img" alt="profile picture" class="creator__img">
              <p class="creator__name">{{ flashcard.creator }}</p>
              <span class="creator__role">{{ flashcard.role }}</span>
            </div>
          </li>
        </ul>
      </div>
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

.dashboard-container {
  background-color: $background-color;
  color: $text-color;
}
.container{
  margin-top: 80px;
  margin-left: 225px;
  padding: 16px;
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
</style>
