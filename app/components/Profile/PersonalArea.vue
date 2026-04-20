<script setup lang="ts">
import { ref,defineEmits,reactive,defineProps,computed } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
import { useOptionsStore } from '@/store/options'
import { useProfileStore } from '@/store/profile'
const autorizationStore = useAutorizationStore();
const optionsStore = useOptionsStore();
const profileStore = useProfileStore();
const persAreaTab = ref(1);
const profile = ref();

const togglePersAreaTab = (val:string) => {
  optionsStore.RESET()
  switch (val) {
    case 'card':
      optionsStore.SET_MY_CARD(true)
      break;
    case 'ticket':
      optionsStore.SET_TICKETS(true)
      break;
    case 'profile':
      optionsStore.SET_PROFILE(true)
      break;
    case 'complaint':
      optionsStore.SET_COMPLAINT(true)
      break;
  }
};


const searchName = () => {

}
const auth = computed(() => {
  return autorizationStore.token != null
})
const name = computed(() => {
  if (typeof profileStore.GET_FETCH_PROFILE.name == 'undefined') {
    return 'Иванов Иван Иванович';
  }
  return profileStore.GET_FETCH_PROFILE.name
})

</script>

<template>
  <div class="personalarea">
    <a href="/" @click="logout">
      <svg  class="exit-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.25 3.75H13.75C14.7446 3.75 15.6984 4.14509 16.4017 4.84835C17.1049 5.55161 17.5 6.50544 17.5 7.5V12.5H16.25V7.5C16.25 6.83696 15.9866 6.20107 15.5178 5.73223C15.0489 5.26339 14.413 5 13.75 5H6.25C5.58696 5 4.95107 5.26339 4.48223 5.73223C4.01339 6.20107 3.75 6.83696 3.75 7.5V23.75C3.75 24.413 4.01339 25.0489 4.48223 25.5178C4.95107 25.9866 5.58696 26.25 6.25 26.25H13.75C14.413 26.25 15.0489 25.9866 15.5178 25.5178C15.9866 25.0489 16.25 24.413 16.25 23.75V18.75H17.5V23.75C17.5 24.7446 17.1049 25.6984 16.4017 26.4017C15.6984 27.1049 14.7446 27.5 13.75 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4017C2.89509 25.6984 2.5 24.7446 2.5 23.75V7.5C2.5 6.50544 2.89509 5.55161 3.59835 4.84835C4.30161 4.14509 5.25544 3.75 6.25 3.75ZM10 15H24.0625L20 10.9375L20.83 10L26.455 15.625L20.83 21.25L20 20.3125L24.0625 16.25H10V15Z" fill="white"/>
      </svg>
    </a>

    <div class="container">
      <h1 class="personalarea__name">{{ name }}</h1>

      <ul class="personalarea__list">
        <li class="personalarea__list-item" @click="togglePersAreaTab('card')" :class="{active:optionsStore.myCard == true}">Мои карты</li>

        <li class="personalarea__list-item" @click="togglePersAreaTab('ticket')" :class="{active:optionsStore.myTickets == true}">мои билеты</li>

        <li class="personalarea__list-item" @click="togglePersAreaTab('profile')" :class="{active:optionsStore.myProfile == true}">профиль</li>

        <li class="personalarea__list-item" @click="togglePersAreaTab('complaint')" :class="{active:optionsStore.complaint == true}">Жалобы и предложения</li>
      </ul>
    </div>
  </div>
</template>


<style lang="scss">
.personalarea {
  padding-top: 17px;

  color: #FFFFFF;

  @media (max-width: 1300px) {
    margin-top: 2px;
    padding-top: 0;
  }

  @media (max-width: 725px) {
    margin-top: -41px;
    padding-top: 100px;
  }

  & .exit-icon {
    display: none;
    @media(max-width: 725px) {
      display: flex;
      position: absolute;
      top: 87px;
      right: 7px;
    }
  }

  & .container {
    align-items: center;

    @media (max-width: 1300px) {
      height: 55px;
    }

    @media (max-width: 725px) {
      padding-left: 11px;

      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }

  &__name {
    padding-left: 44px;

    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 25px;
    line-height: 30px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    background: url('../assets/images/personal_area_icon.svg');
    background-position: left top;
    background-repeat: no-repeat;

    @media (max-width: 1300px){
      padding-left: 32px;
      padding-top: 10px;
      height: 43px;
      font-family: NEXT ART;
      font-size: 20px;
      font-weight: 600;
      line-height: 22px;
      text-align: left;
      width: calc(100% - 568px);

      background-size: 24px;
      background-position: 0 8px;
    }

    @media (max-width: 725px) {
      position: absolute;
      top: 84px;
      left: 10px;
      width: 221px;
    }

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 165px;

      width: 40%;
      height: 1px;

      background-color: #FFFFFF;

      @media (min-width:1601px) {
        width: 35%;
      }

      //@media (max-width: 1199px) {
      //  width: 47%;
      //}

      @media (max-width: 1300px) {
        top: 158px;
        width: 19%;
      }
    }
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 51.7%;

    list-style: none;

    @media (max-width: 1300px){
      width: auto;
    }

    @media (max-width: 725px) {
      margin-right: 10px;
    }

    &-item {
      max-width: 140px;
      min-width: 110px;

      font-family: 'NEXT ART';
      font-weight: 400;
      font-size: 16px;
      line-height: 17px;
      text-align: center;
      white-space: nowrap;

      cursor: pointer;

      @media (max-width: 1300px){
        max-width: 120px;
        min-width: 0;
        font-size: 15px;
        line-height: 16px;
      }

      &:last-child {
        margin-right: 0;

        white-space: normal;

        @media (max-width: 1300px){
          margin-left: 26px;
          text-align: right;
        }
      }

      &:nth-child(2) {
        @media (max-width: 1300px){
          margin-left: 35px;
          margin-right: 31px;
        }
      }

      &.active {
        font-weight: 600;
        color: #01BDF9;
      }

      &:hover {
        text-shadow: 0px 0px 4px #01BDF9;
      }

      &:active {
        color: #01BDF9;
        text-shadow: 0px 0px 4px #01BDF9;
      }
    }
  }
}
</style>
