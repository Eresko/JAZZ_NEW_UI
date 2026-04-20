<script setup lang="ts">
import { defineEmits,onMounted,onUnmounted,computed } from 'vue'
import { useModalStore } from '@/store/modals'
import { useAutorizationStore } from '@/store/autorization'
const modalStore = useModalStore();
const autorizationStore = useAutorizationStore()
const closeMobileMenu = () => {
  modalStore.SET_MOBILE_MENU(false)

}

onMounted(async () => {
  document.addEventListener('scroll', closeMobileMenu)

})
onUnmounted(async () => {
  document.removeEventListener('scroll', closeMobileMenu)
});


const auth = computed(() => {
  return autorizationStore.token != null
})
const toggleFastRegModal = () => {
  modalStore.TOGGLE_AUTH_MODAL();
}

const logout = () => {
    this.SET_TOKEN('');
}
</script>






<template>
  <div>
    <div class="menu__mobile">
      <div class="overlay" @click="closeMobileMenu"></div>
      <ul class="menu__mobile-list">
        <button class="menu__mobile-btn menu-close" @click="closeMobileMenu">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 32.0833C25.5541 32.0833 32.0833 25.5541 32.0833 17.5C32.0833 9.44581 25.5541 2.91663 17.5 2.91663C9.44584 2.91663 2.91666 9.44581 2.91666 17.5C2.91666 25.5541 9.44584 32.0833 17.5 32.0833Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 11.6666L11.6667 17.5L17.5 23.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.3333 17.5H11.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <li class="menu__mobile-item">
          <NuxtLink to="/films" class="menu__mobile-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5167 1.66675H3.48332C2.48001 1.66675 1.66666 2.4801 1.66666 3.48341V16.5167C1.66666 17.5201 2.48001 18.3334 3.48332 18.3334H16.5167C17.52 18.3334 18.3333 17.5201 18.3333 16.5167V3.48341C18.3333 2.4801 17.52 1.66675 16.5167 1.66675Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.83333 1.66663V18.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.1667 1.66663V18.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66667 10H18.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66667 5.83337H5.83334" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66667 14.1666H5.83334" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.1667 14.1666H18.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.1667 5.83337H18.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Фильмы</span>
          </NuxtLink>
        </li>

        <li class="menu__mobile-item">
          <NuxtLink to="/schedule" class="menu__mobile-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6024 1.66663 10 1.66663C5.39762 1.66663 1.66666 5.39759 1.66666 9.99996C1.66666 14.6023 5.39762 18.3333 10 18.3333Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5V10L13.3333 11.6667" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Расписание</span>
          </NuxtLink>
        </li>

        <li class="menu__mobile-item">
          <NuxtLink to="/" class="menu__mobile-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6667 10V18.3333H3.33334V10" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.3333 5.83337H1.66666V10H18.3333V5.83337Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 18.3334V5.83337" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5.83329H6.25C5.69746 5.83329 5.16756 5.6138 4.77686 5.2231C4.38616 4.8324 4.16666 4.30249 4.16666 3.74996C4.16666 3.19743 4.38616 2.66752 4.77686 2.27682C5.16756 1.88612 5.69746 1.66663 6.25 1.66663C9.16666 1.66663 10 5.83329 10 5.83329Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 5.83329H13.75C14.3025 5.83329 14.8324 5.6138 15.2231 5.2231C15.6138 4.8324 15.8333 4.30249 15.8333 3.74996C15.8333 3.19743 15.6138 2.66752 15.2231 2.27682C14.8324 1.88612 14.3025 1.66663 13.75 1.66663C10.8333 1.66663 10 5.83329 10 5.83329Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Акции</span>
          </NuxtLink>
        </li>

        <li class="menu__mobile-item">
          <NuxtLink to="/bar" class="menu__mobile-link bar-link">

            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.87454 4.54104L5.92585 4.98226L6.37004 4.98328L13.0563 4.9987L11.3864 18.3578C11.3596 18.5695 11.2566 18.7642 11.0967 18.9054L11.4276 19.2803L11.0967 18.9054C10.9367 19.0466 10.7307 19.1247 10.5174 19.125H4.1702C3.95684 19.1247 3.75091 19.0466 3.59096 18.9054C3.4311 18.7642 3.32813 18.5697 3.30131 18.3581C3.3013 18.358 3.30128 18.3579 3.30127 18.3578L1.63138 5H4.98885H5.55036L5.4855 4.44225L5.16573 1.69225L5.1143 1.25H4.66908H0.96875V0.875H5.44821L5.48606 1.20044L5.48606 1.20045L5.87454 4.54104Z" stroke="white"/>
            </svg>
            <span>Бар</span>
          </NuxtLink>
        </li>

        <!--        <NuxtLink to="/" class="menu__mobile-link personal-link">-->
        <!--          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <path d="M10.5133 11.0301C13.4458 11.0301 15.8233 12.1636 15.8233 13.5619V15.3704H5.2034V13.5619C5.2034 12.1636 7.58083 11.0301 10.5133 11.0301ZM15.1153 13.5619C15.1153 12.5637 13.055 11.7535 10.5133 11.7535C7.97165 11.7535 5.91139 12.5637 5.91139 13.5619V14.647H15.1153V13.5619ZM10.5133 4.51965C11.1705 4.51965 11.8008 4.7864 12.2655 5.26121C12.7302 5.73602 12.9913 6.38001 12.9913 7.05149C12.9913 7.72298 12.7302 8.36696 12.2655 8.84177C11.8008 9.31659 11.1705 9.58333 10.5133 9.58333C9.85614 9.58333 9.22586 9.31659 8.76115 8.84177C8.29644 8.36696 8.03537 7.72298 8.03537 7.05149C8.03537 6.38001 8.29644 5.73602 8.76115 5.26121C9.22586 4.7864 9.85614 4.51965 10.5133 4.51965ZM10.5133 5.24304C10.0439 5.24304 9.59371 5.43357 9.26177 5.77272C8.92984 6.11187 8.74336 6.57186 8.74336 7.05149C8.74336 7.53112 8.92984 7.99111 9.26177 8.33026C9.59371 8.66942 10.0439 8.85995 10.5133 8.85995C10.9828 8.85995 11.433 8.66942 11.7649 8.33026C12.0968 7.99111 12.2833 7.53112 12.2833 7.05149C12.2833 6.57186 12.0968 6.11187 11.7649 5.77272C11.433 5.43357 10.9828 5.24304 10.5133 5.24304Z" fill="white"/>-->
        <!--            <circle cx="10.5" cy="10.5" r="10" stroke="white"/>-->
        <!--          </svg>-->
        <!--          <span>Личный кабинет</span>-->
        <!--        </NuxtLink>-->



        <!--Личный кабинет-->
        <div v-if="auth">
          <NuxtLink to="/personalarea" class="menu__mobile-btnAuth personal-link">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5133 11.0301C13.4458 11.0301 15.8233 12.1636 15.8233 13.5619V15.3704H5.2034V13.5619C5.2034 12.1636 7.58083 11.0301 10.5133 11.0301ZM15.1153 13.5619C15.1153 12.5637 13.055 11.7535 10.5133 11.7535C7.97165 11.7535 5.91139 12.5637 5.91139 13.5619V14.647H15.1153V13.5619ZM10.5133 4.51965C11.1705 4.51965 11.8008 4.7864 12.2655 5.26121C12.7302 5.73602 12.9913 6.38001 12.9913 7.05149C12.9913 7.72298 12.7302 8.36696 12.2655 8.84177C11.8008 9.31659 11.1705 9.58333 10.5133 9.58333C9.85614 9.58333 9.22586 9.31659 8.76115 8.84177C8.29644 8.36696 8.03537 7.72298 8.03537 7.05149C8.03537 6.38001 8.29644 5.73602 8.76115 5.26121C9.22586 4.7864 9.85614 4.51965 10.5133 4.51965ZM10.5133 5.24304C10.0439 5.24304 9.59371 5.43357 9.26177 5.77272C8.92984 6.11187 8.74336 6.57186 8.74336 7.05149C8.74336 7.53112 8.92984 7.99111 9.26177 8.33026C9.59371 8.66942 10.0439 8.85995 10.5133 8.85995C10.9828 8.85995 11.433 8.66942 11.7649 8.33026C12.0968 7.99111 12.2833 7.53112 12.2833 7.05149C12.2833 6.57186 12.0968 6.11187 11.7649 5.77272C11.433 5.43357 10.9828 5.24304 10.5133 5.24304Z" fill="white"/>
              <circle cx="10.5" cy="10.5" r="10" stroke="white"/>
            </svg>
            <span>Личный кабинет</span>
          </NuxtLink>

          <a href="/" @click="logout" class="menu__mobile-btnLoguot">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 32.0833C25.5541 32.0833 32.0833 25.5541 32.0833 17.5C32.0833 9.44581 25.5541 2.91663 17.5 2.91663C9.44584 2.91663 2.91666 9.44581 2.91666 17.5C2.91666 25.5541 9.44584 32.0833 17.5 32.0833Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.5 11.6666L11.6667 17.5L17.5 23.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23.3333 17.5H11.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Выйти из аккаунта</span>
          </a>
        </div>

        <button to="/" class="menu__mobile-btnAuth personal-link" v-else @click="toggleFastRegModal(), closeMobileMenu()">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5133 11.0301C13.4458 11.0301 15.8233 12.1636 15.8233 13.5619V15.3704H5.2034V13.5619C5.2034 12.1636 7.58083 11.0301 10.5133 11.0301ZM15.1153 13.5619C15.1153 12.5637 13.055 11.7535 10.5133 11.7535C7.97165 11.7535 5.91139 12.5637 5.91139 13.5619V14.647H15.1153V13.5619ZM10.5133 4.51965C11.1705 4.51965 11.8008 4.7864 12.2655 5.26121C12.7302 5.73602 12.9913 6.38001 12.9913 7.05149C12.9913 7.72298 12.7302 8.36696 12.2655 8.84177C11.8008 9.31659 11.1705 9.58333 10.5133 9.58333C9.85614 9.58333 9.22586 9.31659 8.76115 8.84177C8.29644 8.36696 8.03537 7.72298 8.03537 7.05149C8.03537 6.38001 8.29644 5.73602 8.76115 5.26121C9.22586 4.7864 9.85614 4.51965 10.5133 4.51965ZM10.5133 5.24304C10.0439 5.24304 9.59371 5.43357 9.26177 5.77272C8.92984 6.11187 8.74336 6.57186 8.74336 7.05149C8.74336 7.53112 8.92984 7.99111 9.26177 8.33026C9.59371 8.66942 10.0439 8.85995 10.5133 8.85995C10.9828 8.85995 11.433 8.66942 11.7649 8.33026C12.0968 7.99111 12.2833 7.53112 12.2833 7.05149C12.2833 6.57186 12.0968 6.11187 11.7649 5.77272C11.433 5.43357 10.9828 5.24304 10.5133 5.24304Z" fill="white"/>
            <circle cx="10.5" cy="10.5" r="10" stroke="white"/>
          </svg>
          <span>Личный кабинет</span>
        </button>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.menu__mobile {
  display: none;
  @media (max-width: 725px) {
    position: fixed;
    right: 0;
    top: 0;
    display: block;
    width: 100vw;
    height: 100vh;

    z-index: 100;

    &-btn {
      margin: 0;
      padding: 0;
      background: transparent;
      border: none;

      &.menu-open {
        position: fixed;
        right: 11px;
        top: 13px;
      }

      &.menu-close {
        rotate: 180deg;
      }
    }

    &-list {
      position: fixed;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 26px;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 13px 10px 13px 15px;
      width: 184px;
      height: 100%;
      background: #070707;

      z-index: 1002;
    }

    &-item {
      display: flex;
      gap: 7px;
      align-items: center;
      font-size: 13px;
      line-height: 15px;

      &:nth-child(2) {
        margin-top: 36px;
      }
    }

    &-link {
      display: flex;
      gap: 7px;
      align-items: center;
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      text-align: left;
      text-decoration: none;
      color: #fff;

      & svg {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }

    &-btnAuth {
      display: flex;
      gap: 7px;
      align-items: center;
      padding: 0;
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      text-align: left;
      text-decoration: none;
      color: #fff;
      background: inherit;
      border: none;

      & svg {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }

    &-btnLoguot {
      display: flex;
      gap: 7px;
      align-items: center;
      margin-top: 26px;
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      text-align: left;
      text-decoration: none;
      color: #fff;

      & svg {
        display: inline-block;
        width: 20px;
        height: 20px;
        rotate: 180deg;
      }
    }

    .overlay {
      position: fixed; // overlay тоже фиксируем
      width: 100%;
      height: 100%;
      background: rgba(7, 7, 7, 0.55);

      z-index: 1000;
    }

    .personal-link {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 40px;

      &::before {
        content: '';
        margin-left: -15px;
        width: 125px;
        height: 1px;
        background: #fff;
        display: block;
        position: absolute;
        top: -29px;
      }
    }
  }
}
</style>