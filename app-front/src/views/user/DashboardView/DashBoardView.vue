<template>
  <div class="dashboard-container">
    <Header  />
    <Navigation />
    <div class="dashboard-content">
      <div class="fishcards">
        <h1>Ostatnie zestawy</h1>
        <div >
          <ul class="fishcards_content">
            <li class="fishcards_content_box">
              <h3>Name</h3> 
              <p>description</p>
              <p>creator</p>
            </li>
            <li class="fishcards_content_box">Item 2</li>
            <li class="fishcards_content_box">Item 3</li>
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
  
  &_content {
    display: flex;
    justify-content: start;
    align-items: start;
    &_box {
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

}
</style>
