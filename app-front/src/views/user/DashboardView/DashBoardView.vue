<template>
  <div class="dashboard-container">
    <Header  />
    <Navigation />

      <div class="box">
        <h1>Ostatnie zestawy</h1>
        <div >
          <ul class="box__content">
            <li class="box__box">
              <h3 class="box__title">Name</h3> 
              <p class="box__descrption">description</p>
              <div class="creator">
                <img src="" alt="profile picture" class="profil__img">
                <p class="creator__name">creator</p>
                <span class="creator__role">nauczyciel</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import Navigation from '@FlashCardsUi/Navigation/Navigation.vue'
import Header from '@FlashCardsUi/Navigation/Header.vue'

</script>

<style scoped lang="scss">
@import "@src/styles/variables.scss";

.box{
  margin-top: 80px;
  margin-left: 225px;
  padding: 16px;
  
  &__content {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
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
