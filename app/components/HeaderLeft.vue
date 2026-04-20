<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/store/modals'
import { useAutorizationStore } from '@/store/autorization'

const router = useRouter()
const modalStore = useModalStore()
const autorizationStore = useAutorizationStore()

const auth = computed(() => {
  return autorizationStore.token != null
})

const logout = () => {
  autorizationStore.LOGOUT()
}

const go = () => {
  router.push("/")
}

const checkToken = () => {
  autorizationStore.CHECK_TOKEN()
}

const toggleFastRegModal = async () => {
  await modalStore.TOGGLE_FAST_REG_MODAL()
}

const scrollToElement = () => {
  // логика скролла
}
</script>

<template>
  <section class="header__left">
    <div class="header__logo">
      <div class="mobile-logo-wrapper" @click="go">
        <img src="../assets/images/logo.svg" alt="Логотип Jazz Cinema" class="mobile-logo">
        <div class="mobile-logo-backdrop"></div>
      </div>
      <img src="../assets/images/logo.svg" alt="Логотип Jazz Cinema" class="header__left-logo" @click="go">
      <address class="header__left-address">Магнитогорск, Герцена, 6</address>
    </div>

    <div class="header__cabinet">
      <p class="enterCabinet__text">
        Чтобы воспользоваться преимуществами,<br/> войди в личный кабинет
      </p>

      <div class="authCabinet header-authCabinet" v-if="auth">
        <NuxtLink to="/personalarea" class="enterCabinet-link">
          <img src="../assets/images/cabinet.svg" alt="Войти в личный кабинет">
        </NuxtLink>

        <a href="/" @click="logout">
          <img src="../assets/images/logout.svg" alt="Выйти из аккаунта">
        </a>
      </div>

      <button class="enterCabinet-btn" v-else @click="toggleFastRegModal">Войти</button>
    </div>

    <div class="header__social">
      <ul class="social__list">
        <li class="social__list-item">
          <a href="https://m.vk.com/jazzcinema1010?from=groups" class="social__item-link vk" aria-label="Мы в VK">
            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="social__item-icon" fill-rule="evenodd" clip-rule="evenodd" d="M14.6559 0.592488C14.7597 0.251245 14.6559 0 14.1591 0H12.5185C12.101 0 11.9085 0.21687 11.8041 0.45624C11.8041 0.45624 10.9698 2.4537 9.78792 3.75117C9.40543 4.12741 9.23168 4.24679 9.02294 4.24679C8.91856 4.24679 8.76169 4.12741 8.76169 3.78555V0.592488C8.76169 0.182496 8.64669 0 8.2992 0H5.71925C5.45864 0 5.30176 0.189996 5.30176 0.370617C5.30176 0.758734 5.893 0.848732 5.95363 1.94121V4.31491C5.95363 4.83552 5.858 4.9299 5.64926 4.9299C5.09302 4.9299 3.73992 2.92306 2.93681 0.626862C2.78119 0.179996 2.62369 0 2.20433 0H0.562488C0.093748 0 0 0.21687 0 0.45624C0 0.882482 0.556238 2.99994 2.59057 5.8005C3.94679 7.71296 5.85613 8.74982 7.59547 8.74982C8.63857 8.74982 8.76732 8.51982 8.76732 8.12296V6.67736C8.76732 6.21675 8.86606 6.12487 9.19668 6.12487C9.44043 6.12487 9.85729 6.24487 10.831 7.16672C11.9435 8.25983 12.1266 8.74982 12.7529 8.74982H14.3934C14.8622 8.74982 15.0972 8.51982 14.9622 8.06483C14.8134 7.61234 14.2822 6.95548 13.5778 6.17612C13.1953 5.73238 12.6216 5.25427 12.4472 5.0149C12.2041 4.70803 12.2735 4.57115 12.4472 4.29804C12.4472 4.29804 14.4472 1.53184 14.6553 0.592488H14.6559Z" fill="white"/>
            </svg>
          </a>
        </li>
        <li class="social__list-item">
          <a href="https://m.vk.com/ps_cinema?from=groups" class="social__item-link ps" aria-label="Мы в PS">
            <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="social__item-icon" d="M2.69531 4.95752V2.13037H5.74219C6.57715 2.13037 7.30957 2.71631 7.30957 3.54395C7.30957 4.42285 6.51855 4.95752 5.74951 4.95752H2.69531ZM0.944824 0.504395V11H2.69531V6.54688H5.95459C7.69775 6.54688 9.03076 5.24316 9.03076 3.54395C9.03076 1.71289 7.64648 0.511719 5.95459 0.504395H0.944824ZM9.88037 9.16162C11.3599 10.458 12.9565 10.9927 14.3555 10.9927C16.6113 11 18.3691 9.66699 18.3691 7.85059C18.3691 3.83691 11.748 5.74854 11.748 3.44141C11.748 2.50391 12.6343 2.08643 13.7476 2.08643C14.6997 2.08643 15.8203 2.40869 16.604 2.97998L17.6001 1.74951C16.4282 0.907227 15.022 0.49707 13.7402 0.49707C11.7041 0.504395 10.0122 1.51514 10.0122 3.56592C10.0122 7.35986 16.6406 5.62402 16.6406 7.85791C16.6406 8.75146 15.6299 9.396 14.3115 9.38867C13.2715 9.38867 12.0337 8.97852 10.957 7.96045L9.88037 9.16162Z" fill="white"/>
            </svg>
          </a>
        </li>
      </ul>

      <div class="link__arrow-wrapper" @click="scrollToElement">
        <img class="link-arrow" src="../assets/images/arrow.svg" >
      </div>
    </div>
  </section>
</template>



<style lang="scss">
.mobile-logo-wrapper {
  display: none;
}
@media (max-width: 725px) {
  /* Скрываем стандартный логотип на мобильных */
  .mobile-logo-wrapper {
    display: block;
  }
  .header__left-logo {
    display: none;
  }

  /* Мобильный фиксированный логотип */
  .mobile-logo-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 62px;
    z-index: 999;
    cursor: pointer;
    background: #000;
  }

  .mobile-logo {
    margin: 6px 0 0 10px;
    width: 84px;
    height: 44px;
    display: block;
    z-index: 2;
  }

  .mobile-logo-backdrop {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: #000;
    z-index: 1;
  }
}

.header__left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 29.7%;
  min-width: 340px;
  padding: 16px 0px 50px;
  padding-left: calc(22.6% / 2);

  background-color: #1c1c1c;
  color: #ffffff;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;

  &-logo {
    margin-bottom: 4px;
    cursor: pointer;

    @media (max-width: 725px) {
      margin: 6px 0 0 10px;
      width: 84px;
      height: 44px;
    }
  }

  &-address {
    font-style: normal;

    @media (max-width: 725px) {
      display: none;
    }
  }

  & .header__cabinet {
    margin-top: 90px;
    //margin-bottom: 30px;

    @media (max-width: 1300px) {
      margin-top: 88px;
      //margin-bottom: 0;
    }

    @media (max-width: 725px) {
      display: none;
    }
  }

  & .enterCabinet__text {
    max-width: 198px;
  }

  & br {
    display: none;
  }

  .header-authCabinet {
    //margin-bottom: 110px;
    margin-right: 60px;
  }

  & .enterCabinet-btn {
    display: block;
  }

  & .header__social {
    margin-top: auto;
    display: flex;

    @media (max-width: 725px) {
      display: none;
    }
  }

  & .social__item-link {
    padding-top: 4px;
  }

  & .link__arrow-wrapper {
    display: inline-block;
    height: 25px;

    cursor: pointer;
    transition: all 0.3s;
    transform: rotateZ(90deg) translateX(-25px);

    @media (max-width: 1300px) {
      margin-left: -15px;
      display: none;
    }

    &:hover {
      transform: rotateZ(90deg) translateX(-10px);
    }
  }

  & .link-arrow {
    width: 93px;
  }
}

@media (max-width: 1300px) {
  .header__left {

    width: 27.2%;
    min-width: 0;
    padding: 8px 0 46px 24px;

    justify-content: inherit;

    &-address {
      font-size: 12px;
      line-height: 15px;
    }

    & .enterCabinet__text {
      max-width: 187px;
      font-size: 13px;
      line-height: 16px;
    }

    & br {
      display: inline-block;
    }
  }
}

@media (max-width: 725px) {
  .header {
    position: absolute;

    &__left {
      position: absolute;
      padding: 0;
      background-color: inherit;
      z-index: 8;
    }
  }
}
</style>
