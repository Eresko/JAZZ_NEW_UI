<script setup lang="ts">
import { defineEmits } from 'vue'
import { useModalStore } from '@/store/modals'
const emit = defineEmits(['showMobileMenu'])
const modalStore = useModalStore()
const showMobileMenu = () => {
  modalStore.SET_MOBILE_MENU(true)
}

</script>


<template>
  <div>
    <button class="menu__mobile-btn menu-open" @click="showMobileMenu">
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 32.0833C25.5541 32.0833 32.0833 25.5541 32.0833 17.5C32.0833 9.44581 25.5541 2.91663 17.5 2.91663C9.44584 2.91663 2.91666 9.44581 2.91666 17.5C2.91666 25.5541 9.44584 32.0833 17.5 32.0833Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.5 11.6666L11.6667 17.5L17.5 23.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M23.3333 17.5H11.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <nav class="header__menu hidden md:flex">
      <ul class="header__menu-list">
        <li class="header__menu-item">
          <NuxtLink to="/films" class="header__menu-link">Фильмы</NuxtLink>
        </li>

        <li class="header__menu-item">
          <NuxtLink to="/schedule" class="header__menu-link">Расписание</NuxtLink>
        </li>

        <li class="header__menu-item">
          <NuxtLink to="/" class="header__menu-link">Акции</NuxtLink>
        </li>

        <!--      <li class="header__menu-item">-->
        <!--        <NuxtLink to="/bar" class="header__menu-link bar-link">-->
        <!--          <span>Бар</span>-->
        <!--          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <path d="M5.87454 4.54104L5.92585 4.98226L6.37004 4.98328L13.0563 4.9987L11.3864 18.3578C11.3596 18.5695 11.2566 18.7642 11.0967 18.9054L11.4276 19.2803L11.0967 18.9054C10.9367 19.0466 10.7307 19.1247 10.5174 19.125H4.1702C3.95684 19.1247 3.75091 19.0466 3.59096 18.9054C3.4311 18.7642 3.32813 18.5697 3.30131 18.3581C3.3013 18.358 3.30128 18.3579 3.30127 18.3578L1.63138 5H4.98885H5.55036L5.4855 4.44225L5.16573 1.69225L5.1143 1.25H4.66908H0.96875V0.875H5.44821L5.48606 1.20044L5.48606 1.20045L5.87454 4.54104Z" stroke="white"/>-->
        <!--          </svg>-->
        <!--        </NuxtLink>-->
        <!--      </li>-->
      </ul>
    </nav>
  </div>

</template>

<style lang="scss">
.header__menu {
  position: absolute;
  top: 19px;
  left: 50%;

  transform: translateX(-50%);

  z-index: 2;

  &-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 466px;
    list-style-type: none;

    @media (max-width: 725px) {
      display: none;
    }
  }

  &-link {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    text-decoration: none;

    &:hover {
      color: #01bdf9;
      text-shadow: 0px 0px 4px #01bdf9;
    }

    & svg {
      display: none;
    }
  }

  .bar-link {
    display: flex;
    align-items: center;

    padding: 5px 40px;

    border: 1px solid #FFFFFF;
    border-radius: 20px;

    & span {
      padding-right: 5px;
    }
  }
  .personal-link {
    display: none;
  }
}

.menu-open {
  display: none;

  @media (max-width: 725px) {
    position: absolute;
    right: 11px;
    top: 13px;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    display: block;

    z-index: 8;
  }
}
</style>
