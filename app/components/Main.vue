<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default() {
      return ""
    },
  }
})


</script>

<template>
  <section class="main" :class="{black: type == 'black'}">
    <slot />
  </section>
</template>


<style lang="scss">
.main {
  position: relative;

  padding-top: 38px;
  padding-bottom: 186px;
  overflow-x: scroll;

  @media (max-width: 1300px) {
    //padding-bottom: 75px;

    padding-bottom: 146px;
  }

  @media (max-width: 725px) {
    padding-top: 59px;
    //padding-bottom: 37px;
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 29.7%;
    min-width: 340px;

    background-color: #1C1C1C;

    z-index: -1;

    @media (max-width: 1300px) {
      width: 27.2%;
      min-width: auto;
    }

    @media (max-width: 725px) {
      display: none;
    }
  }

  &.black {
    padding: 100px 0 54px;

    background: #161616;

    @media(max-width: 725px) {
      background: #000;
    }

    &::before {
      display: none;
    }
  }

  & .back-link {
    @media(max-width: 725px) {
      //padding-top: 40px!important;
      background: #fff!important;

      & a {
        color: #1c1c1c!important;
      }
    }
  }
}
</style>
