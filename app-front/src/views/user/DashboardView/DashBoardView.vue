<template>
  <div class="dashboard-container">
    <Header  />
    <Navigation />
    <div class="dashboard-content">
      <div class="fishcards">
        <h1>Ostatnie zestawy</h1>
        <div >
          <ul class="fishcards__content">
            <li class="fishcards__box">
              <h3 class="box__title">Name</h3> 
              <p class="box__descrption">description</p>
              <div class="creator">
                <img src="" alt="" class="creator__img">
                <p class="creator__name">creator</p>
                <span class="creator__role">nauczyciel</span>
              </div>
            </li>
            <li class="fishcards__box">Item 2</li>
            <li class="fishcards__box">Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@FlashCardsUi/Navigation/Navigation.vue'
import Header from '@FlashCardsUi/Navigation/Header.vue'

const emit = defineEmits(['increment'])

</script>

<style scoped lang="scss">
@import "../../../styles/variables.scss";

.fishcards{
  margin-top: 80px;
  margin-left: 225px;
  padding: 16px;
  box-sizing: border-box;
  
  &__content {
    display: flex;
    justify-content: start;
    align-items: start;
  }
  &__box {
    min-width: 290px;
    height: 196px;
    background-color: $primary-color;
    border-radius: 10px;
    margin: 0 16px 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

}
</style>
