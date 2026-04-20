<script setup lang="ts">
import { ref,defineEmits,reactive,defineProps,onMounted } from 'vue'



const countPageReservation= ref(1)
const controlTab = ref(1)

const toggleControlTab = (val) => {
  controlTab.value = val
}

</script>
<template>
  <div class="history__control">
    <ul class="history__control-list" v-if="countPageReservation > 7">
      <li class="history__control-item" :class="{active:controlTab==1}" >
        <button class="history__control-item-btn" @click="toggleControlTab(1)">1</button>
      </li>

      <li class="history__control-item" v-if="countPageReservation > 5 && controlTab > 3">
        <span>...</span>
      </li>

      <li class="history__control-item" :class="{active:controlTab==2}" v-if="countPageReservation > 1 && controlTab < 4">
        <button class="history__control-item-btn" @click="toggleControlTab(2 + (controlTab> 3 ? controlTab : 0))">{{ 2 + (controlTab> 3 ? controlTab : 0) }}</button>
      </li>

      <li class="history__control-item" :class="{active:controlTab==3}" v-if="countPageReservation > 2">
        <button class="history__control-item-btn" @click="toggleControlTab(3 + (controlTab> 3 ? controlTab - 4 : 0))">{{ 3 + (controlTab> 3 ? controlTab - 4 : 0) }}</button>
      </li>

      <li class="history__control-item" :class="{active:controlTab== (4 + (controlTab> 3 ? controlTab - 4 : 0))}" v-if="countPageReservation > 3 ">
        <button class="history__control-item-btn" @click="toggleControlTab(4 + (controlTab> 3 ? controlTab - 4 : 0))">{{ 4 + (controlTab> 3 ? controlTab - 4 : 0) }}</button>
      </li>

      <li class="history__control-item"  v-if="countPageReservation > 4 && controlTab > 3 && ((countPageReservation - controlTab) > 1)">
        <button class="history__control-item-btn" @click="toggleControlTab(5 + (controlTab> 3 ? controlTab - 4 : 0))">{{ 5 + (controlTab> 3 ? controlTab - 4 : 0) }}</button>
      </li>

      <li class="history__control-item" v-if="countPageReservation > 5 && ((countPageReservation - controlTab) > 2)">
        <span>...</span>
      </li>
      <li class="history__control-item"  v-if="countPageReservation > 4 && countPageReservation != controlTab">
        <button class="history__control-item-btn" @click="toggleControlTab(countPageReservation)">{{ countPageReservation }}</button>
      </li>
    </ul>
    <ul class="history__control-list" v-else>
      <li class="history__control-item" :class="{active: ( controlTab== (key + 1))}" v-for="(page,key) in countPageReservation">
        <button class="history__control-item-btn"  @click="toggleControlTab(key + 1)">{{ key + 1 }}</button>
      </li>
    </ul>

    <button class="history__control-item-btn next-btn" @click="toggleControlTab(countPageReservation)">Следующая</button>

    <button class="history__control-item-btn" @click="toggleControlTab(countPageReservation - 1)">Предыдущая</button>
  </div>
</template>

<style lang="scss">
.history__control {
  display: flex;
  justify-content: flex-end;

  @media (max-width: 725px) {
    display: none;
  }

  &-list {
    display: flex;

    margin-right: 38px;

    list-style: none;
  }

  &-item:not(:last-child) {
    margin-right: 24px;
  }

  &-item.active .history__control-item-btn {
    font-weight: 700;
    color: #01BDF9;

    //text-decoration: none;

    &::after {
      height: 0;
    }
  }

  &-item-btn {
    position: relative;
    padding: 0;

    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    //text-decoration-line: underline;
    //text-underline-offset: 2px;
    color: #FFFFFF;

    border: none;
    background: none;
    cursor: pointer;

    &::after {
      content:'';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.5px;
      background-color: #fff;
    }

    &.next-btn {
      margin-right: 21px;
    }

    &:hover {
      color: #01BDF9;
      text-shadow: 0px 0px 4px #01BDF9;

      &::after {
        background-color: #01BDF9;
      }
    }

    &:active {
      color: #98E6FF;
      text-shadow: none;

      &::after {
        background-color: #98E6FF;
      }
    }
  }
}
</style>
