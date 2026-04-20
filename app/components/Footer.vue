<script setup lang="ts">
import { ref, computed } from 'vue'
import { useModalStore } from '@/store/modals'
import { useAutorizationStore } from '@/store/autorization'

const modalStore = useModalStore();
const autorizationStore = useAutorizationStore();

const logout = () => {
  autorizationStore.LOGOUT()
}

const auth = computed(() => {
  return autorizationStore.token != null
})
const toggleFastModal = () => {
  modalStore.TOGGLE_FAST_MODAL()
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <section class="footer__left">
        <h2 class="footer__heading">ДЖАЗ СИНЕМА</h2>

        <address class="footer__address">
          Магнитогорск, Герцена, 6 <br/> ТРК Джаз Молл
        </address>

        <p class="enterCabinet__text">
          Чтобы воспользоваться преимуществами, <br/>войди в личный кабинет
        </p>




        <div class="authCabinet" v-if="auth">
          <NuxtLink to="/personalarea" class="enterCabinet-link">
            <img src="../assets/images/cabinet.svg" alt="Войти в личный кабинет">
          </NuxtLink>

          <a href="/" @click="logout">
            <img src="../assets/images/logout.svg" alt="Выйти из аккаунта">
          </a>
        </div>

        <button class="enterCabinet-btn" v-else @click="toggleFastModal">Войти</button>
      </section>

      <section class="footer__right">
        <div class="footer__navigation">
          <nav class="footer__nav">
            <ul class="footer__nav-list">
              <li class="footer__list-item">
                <NuxtLink to="/schedule" class="footer__nav-link"
                >Расписание</NuxtLink
                >
              </li>

              <li class="footer__list-item">
                <NuxtLink to="/films" class="footer__nav-link">Фильмы</NuxtLink>
              </li>

              <li class="footer__list-item">
                <NuxtLink to="#" class="footer__nav-link">Акции</NuxtLink>
              </li>
            </ul>
          </nav>

          <nav class="footer__nav-about">
            <ul class="footer__about-list">
              <li class="footer__about-item">
                <NuxtLink to="/about" class="footer__nav-link"
                >О кинотеатре</NuxtLink
                >
              </li>

              <li class="footer__about-item">
                <NuxtLink to="/club" class="footer__nav-link"
                >Киноклуб "ПС"</NuxtLink
                >
              </li>

              <li class="footer__about-item">
                <NuxtLink to="#" class="footer__nav-link"
                >Показать на карте</NuxtLink
                >
              </li>

              <li class="footer__about-item">
                <NuxtLink to="/loyalty" class="footer__nav-link"
                >Программа лояльности</NuxtLink
                >
              </li>

              <li class="footer__about-item">
                <NuxtLink to="/memorandum" class="footer__nav-link"
                >Меморандум</NuxtLink
                >
              </li>

              <li class="footer__about-item">
                <NuxtLink to="/rules" class="footer__nav-link"
                >Правила посещения</NuxtLink
                >
              </li>
            </ul>
          </nav>
        </div>

        <p class="privacy">
          <NuxtLink to="#" class="footer__nav-link"
          >Политика конфиденциальности</NuxtLink
          >
        </p>

        <div class="social">
          <ul class="social__list">
            <li class="social__list-item">
              <a href="https://m.vk.com/jazzcinema1010?from=groups" class="social__item-link vk" aria-label="Мы в VK">
                <svg
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      class="social__item-icon"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.6559 0.592488C14.7597 0.251245 14.6559 0 14.1591 0H12.5185C12.101 0 11.9085 0.21687 11.8041 0.45624C11.8041 0.45624 10.9698 2.4537 9.78792 3.75117C9.40543 4.12741 9.23168 4.24679 9.02294 4.24679C8.91856 4.24679 8.76169 4.12741 8.76169 3.78555V0.592488C8.76169 0.182496 8.64669 0 8.2992 0H5.71925C5.45864 0 5.30176 0.189996 5.30176 0.370617C5.30176 0.758734 5.893 0.848732 5.95363 1.94121V4.31491C5.95363 4.83552 5.858 4.9299 5.64926 4.9299C5.09302 4.9299 3.73992 2.92306 2.93681 0.626862C2.78119 0.179996 2.62369 0 2.20433 0H0.562488C0.093748 0 0 0.21687 0 0.45624C0 0.882482 0.556238 2.99994 2.59057 5.8005C3.94679 7.71296 5.85613 8.74982 7.59547 8.74982C8.63857 8.74982 8.76732 8.51982 8.76732 8.12296V6.67736C8.76732 6.21675 8.86606 6.12487 9.19668 6.12487C9.44043 6.12487 9.85729 6.24487 10.831 7.16672C11.9435 8.25983 12.1266 8.74982 12.7529 8.74982H14.3934C14.8622 8.74982 15.0972 8.51982 14.9622 8.06483C14.8134 7.61234 14.2822 6.95548 13.5778 6.17612C13.1953 5.73238 12.6216 5.25427 12.4472 5.0149C12.2041 4.70803 12.2735 4.57115 12.4472 4.29804C12.4472 4.29804 14.4472 1.53184 14.6553 0.592488H14.6559Z"
                      fill="white"
                  />
                </svg>
              </a>
            </li>

            <!--            <li class="social__list-item">-->
            <!--              <a-->
            <!--                href="#"-->
            <!--                class="social__item-link facebook"-->
            <!--                aria-label="Мы в Facebook"-->
            <!--              >-->
            <!--                <svg-->
            <!--                  width="7"-->
            <!--                  height="14"-->
            <!--                  viewBox="0 0 7 14"-->
            <!--                  fill="none"-->
            <!--                  xmlns="http://www.w3.org/2000/svg"-->
            <!--                >-->
            <!--                  <path-->
            <!--                    class="social__item-icon facebook"-->
            <!--                    d="M1.78694 14V7.43079H0V5.06556H1.78694V3.04535C1.78694 1.45785 2.84249 0 5.2747 0C6.25947 0 6.98766 0.09177 6.98766 0.09177L6.93028 2.30049C6.93028 2.30049 6.18764 2.29347 5.37725 2.29347C4.50015 2.29347 4.35963 2.68638 4.35963 3.33851V5.06556H7L6.88511 7.43079H4.35963V14H1.78694Z"-->
            <!--                    fill="white"-->
            <!--                  />-->
            <!--                </svg>-->
            <!--              </a>-->
            <!--            </li>-->

            <!--            <li class="social__list-item">-->
            <!--              <a-->
            <!--                href="#"-->
            <!--                class="social__item-link instagram"-->
            <!--                aria-label="Мы в Instagram"-->
            <!--              >-->
            <!--                <svg-->
            <!--                  width="14"-->
            <!--                  height="14"-->
            <!--                  viewBox="0 0 14 14"-->
            <!--                  fill="none"-->
            <!--                  xmlns="http://www.w3.org/2000/svg"-->
            <!--                >-->
            <!--                  <path-->
            <!--                    class="social__item-icon"-->
            <!--                    fill-rule="evenodd"-->
            <!--                    clip-rule="evenodd"-->
            <!--                    d="M4.11409 0.042C4.86055 0.00763635 5.09855 0 7 0C8.90145 0 9.13945 0.00827272 9.88527 0.042C10.6311 0.0757273 11.1402 0.194727 11.5856 0.367182C12.0521 0.543455 12.4753 0.819 12.8253 1.17536C13.1816 1.52473 13.4565 1.94727 13.6322 2.41436C13.8053 2.85982 13.9236 3.36891 13.958 4.11345C13.9924 4.86118 14 5.09918 14 7C14 8.90145 13.9917 9.13945 13.958 9.88591C13.9243 10.6305 13.8053 11.1395 13.6322 11.585C13.4565 12.0522 13.1812 12.4754 12.8253 12.8253C12.4753 13.1816 12.0521 13.4565 11.5856 13.6322C11.1402 13.8053 10.6311 13.9236 9.88655 13.958C9.13945 13.9924 8.90145 14 7 14C5.09855 14 4.86055 13.9917 4.11409 13.958C3.36955 13.9243 2.86045 13.8053 2.415 13.6322C1.94786 13.4565 1.52461 13.1812 1.17473 12.8253C0.818605 12.4757 0.543018 12.0527 0.367182 11.5856C0.194727 11.1402 0.0763636 10.6311 0.042 9.88655C0.00763635 9.13882 0 8.90082 0 7C0 5.09855 0.00827272 4.86055 0.042 4.11473C0.0757273 3.36891 0.194727 2.85982 0.367182 2.41436C0.543278 1.94732 0.819076 1.52429 1.17536 1.17473C1.52475 0.818683 1.94757 0.5431 2.41436 0.367182C2.85982 0.194727 3.36955 0.0763636 4.11409 0.042ZM9.82864 1.302C9.09045 1.26827 8.869 1.26127 7 1.26127C5.131 1.26127 4.90955 1.26827 4.17136 1.302C3.48855 1.33318 3.11818 1.44709 2.87127 1.54318C2.54482 1.67045 2.31127 1.82127 2.06627 2.06627C1.83403 2.29221 1.6553 2.56727 1.54318 2.87127C1.44709 3.11818 1.33318 3.48855 1.302 4.17136C1.26827 4.90955 1.26127 5.131 1.26127 7C1.26127 8.869 1.26827 9.09045 1.302 9.82864C1.33318 10.5115 1.44709 10.8818 1.54318 11.1287C1.65518 11.4323 1.834 11.7078 2.06627 11.9337C2.29218 12.166 2.56773 12.3448 2.87127 12.4568C3.11818 12.5529 3.48855 12.6668 4.17136 12.698C4.90955 12.7317 5.13036 12.7387 7 12.7387C8.86964 12.7387 9.09045 12.7317 9.82864 12.698C10.5115 12.6668 10.8818 12.5529 11.1287 12.4568C11.4552 12.3295 11.6887 12.1787 11.9337 11.9337C12.166 11.7078 12.3448 11.4323 12.4568 11.1287C12.5529 10.8818 12.6668 10.5115 12.698 9.82864C12.7317 9.09045 12.7387 8.869 12.7387 7C12.7387 5.131 12.7317 4.90955 12.698 4.17136C12.6668 3.48855 12.5529 3.11818 12.4568 2.87127C12.3295 2.54482 12.1787 2.31127 11.9337 2.06627C11.7078 1.83405 11.4327 1.65532 11.1287 1.54318C10.8818 1.44709 10.5115 1.33318 9.82864 1.302ZM6.10591 9.15791C6.60524 9.36576 7.16124 9.39382 7.67895 9.23728C8.19667 9.08074 8.64398 8.74931 8.94448 8.29961C9.24498 7.84991 9.38004 7.30983 9.32658 6.77161C9.27312 6.2334 9.03446 5.73044 8.65136 5.34864C8.40715 5.10458 8.11186 4.9177 7.78676 4.80146C7.46165 4.68522 7.11482 4.6425 6.77122 4.67639C6.42763 4.71028 6.09582 4.81993 5.79969 4.99745C5.50356 5.17496 5.25047 5.41593 5.05865 5.703C4.86682 5.99006 4.74103 6.31609 4.69033 6.65761C4.63963 6.99913 4.66528 7.34764 4.76543 7.67806C4.86559 8.00847 5.03776 8.31257 5.26955 8.56846C5.50134 8.82435 5.78698 9.02566 6.10591 9.15791ZM4.45582 4.45582C4.78992 4.12171 5.18657 3.85668 5.6231 3.67587C6.05963 3.49505 6.5275 3.40198 7 3.40198C7.4725 3.40198 7.94037 3.49505 8.3769 3.67587C8.81343 3.85668 9.21008 4.12171 9.54418 4.45582C9.87829 4.78992 10.1433 5.18657 10.3241 5.6231C10.505 6.05963 10.598 6.5275 10.598 7C10.598 7.4725 10.505 7.94037 10.3241 8.3769C10.1433 8.81343 9.87829 9.21008 9.54418 9.54418C8.86942 10.2189 7.95425 10.598 7 10.598C6.04575 10.598 5.13058 10.2189 4.45582 9.54418C3.78106 8.86942 3.40198 7.95425 3.40198 7C3.40198 6.04575 3.78106 5.13058 4.45582 4.45582ZM11.396 3.93782C11.4788 3.85972 11.5451 3.7658 11.5909 3.66162C11.6368 3.55744 11.6612 3.44513 11.6629 3.33132C11.6646 3.21751 11.6434 3.10453 11.6006 2.99906C11.5578 2.89359 11.4943 2.79778 11.4138 2.7173C11.3333 2.63682 11.2375 2.5733 11.132 2.53051C11.0266 2.48772 10.9136 2.46653 10.7998 2.46819C10.686 2.46985 10.5736 2.49433 10.4695 2.54017C10.3653 2.58602 10.2714 2.6523 10.1933 2.73509C10.0414 2.89611 9.95822 3.10999 9.96145 3.33132C9.96467 3.55265 10.054 3.76401 10.2106 3.92054C10.3671 4.07706 10.5784 4.16642 10.7998 4.16964C11.0211 4.17287 11.235 4.08971 11.396 3.93782Z"-->
            <!--                    fill="white"-->
            <!--                  />-->
            <!--                </svg>-->
            <!--              </a>-->
            <!--            </li>-->

            <li class="social__list-item">
              <a href="https://m.vk.com/ps_cinema?from=groups" class="social__item-link ps" aria-label="Мы в PS">
                <svg
                    width="19"
                    height="11"
                    viewBox="0 0 19 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      class="social__item-icon"
                      d="M2.69531 4.95752V2.13037H5.74219C6.57715 2.13037 7.30957 2.71631 7.30957 3.54395C7.30957 4.42285 6.51855 4.95752 5.74951 4.95752H2.69531ZM0.944824 0.504395V11H2.69531V6.54688H5.95459C7.69775 6.54688 9.03076 5.24316 9.03076 3.54395C9.03076 1.71289 7.64648 0.511719 5.95459 0.504395H0.944824ZM9.88037 9.16162C11.3599 10.458 12.9565 10.9927 14.3555 10.9927C16.6113 11 18.3691 9.66699 18.3691 7.85059C18.3691 3.83691 11.748 5.74854 11.748 3.44141C11.748 2.50391 12.6343 2.08643 13.7476 2.08643C14.6997 2.08643 15.8203 2.40869 16.604 2.97998L17.6001 1.74951C16.4282 0.907227 15.022 0.49707 13.7402 0.49707C11.7041 0.504395 10.0122 1.51514 10.0122 3.56592C10.0122 7.35986 16.6406 5.62402 16.6406 7.85791C16.6406 8.75146 15.6299 9.396 14.3115 9.38867C13.2715 9.38867 12.0337 8.97852 10.957 7.96045L9.88037 9.16162Z"
                      fill="white"
                  />
                </svg>
              </a>
            </li>
          </ul>

          <ul class="mobileStore__list">
            <li class="mobileStore__list-item">
              <a href="#" class="mobileStore__item-link appstore">
                <img
                    src="../assets/images/appstore.svg"
                    alt="Скачать приложение в AppStore"
                />
              </a>
            </li>

            <li class="mobileStore__list-item">
              <a href="#" class="mobileStore__item-link google">
                <img
                    src="../assets/images/googleplay.svg"
                    alt="Скачать приложение в Google Play"
                />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  position: relative;
  padding-top: 97px;
  padding-bottom: 57px;

  background-color: #1c1c1c;

  @media (max-width: 725px) {
    padding-top: 40px;
  }
  .footer__container {
    @media (max-width: 725px) {
      display: flex;
      flex-direction: column;
    }
  }

  .footer__container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 29.7%;
    min-width: 340px;

    background-color: #404040;

    @media (max-width: 1300px) {
      width: 27.2%;
      min-width: auto;
    }

    @media (max-width: 725px) {
      display: none;
    }
  }

  &__left {
    color: #fff;

    font-family: "Montserrat";
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 17px;

    z-index: 1;

    @media (max-width: 1300px) {
      font-size: 12px;
      line-height: 14px;
    }
  }

  &__heading {
    margin-bottom: 8px;

    font-family: "NEXT ART";
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 33px;
    text-transform: uppercase;
    white-space: nowrap;

    @media (max-width: 1300px) {
      margin-bottom: 1px;
      font-size: 23px;
      line-height: 25px;
    }

    @media (max-width: 725px) {
      text-align: center;
    }
  }

  &__address {
    margin-bottom: 103px;
    max-width: 183px;

    font-style: normal;

    @media (max-width: 725px) {
      margin-bottom: 54px;
      max-width: none;
      text-align: center;
    }

    & br {
      display: none;

      @media (max-width: 725px) {
        display: block;
      }
    }
  }

  &__right {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 66%;

    font-family: "Montserrat";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    color: #ffffff;

    @media (max-width: 1300px) {
      font-size: 13px;
    }

    @media (max-width: 725px) {
      width: 100%;
      text-align: center;
    }
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
    width: 91%;

    margin-bottom: 29px;

    @media (max-width: 1300px) {
      margin-bottom: 90px;
    }

    @media (max-width: 725px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }

  &__nav {
    margin-right: 35px;
    font-family: "Montserrat";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;

    @media(max-width: 725px) {
      display:none;
    }

    &-list {
      list-style-type: none;
    }

    &-link {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        color: #01bdf9;
        text-shadow: 0px 0px 4px #01bdf9;
      }
    }
  }

  &__about-list {
    list-style-type: none;
    column-count: 2;

    @media (max-width: 1300px) {
      display: flex;
      flex-direction: column;
    }
  }
}

.enterCabinet__text {
  max-width: 180px;

  @media (max-width: 725px) {
    display: none;
  }

  & br {
    display: none;

    @media (max-width: 1300px) {
      display: block;
    }
  }
}

.authCabinet {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26px;

  line-height: 0;

  @media (max-width: 725px) {
    display: none;
  }
}

.enterCabinet-link {
  margin-right: 17px;
}

.enterCabinet-btn {
  padding: 9px 53px;
  margin-top: 30px;

  text-transform: uppercase;
  font-family: "NEXT ART";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #ffffff;

  border: 1px solid #ffffff;
  border-radius: 50px;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    border: 1px solid #01bdf9;
    filter: drop-shadow(0px 0px 4px #01bdf9);

    color: #01bdf9;
    text-shadow: 0px 0px 4px #01bdf9;
  }

  &:active {
    border: 1px solid #98e6ff;
    color: #98e6ff;
    filter: none;
    text-shadow: none;
  }

  @media (max-width: 725px) {
    display: none;
  }
}

.privacy {
  margin-bottom: 123px;

  @media (max-width: 1300px) {
    position: absolute;
    top: 125px;
    margin: 0;
  }

  @media (max-width: 725px) {
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
}

.social {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 87%;

  @media (max-width: 1300px) {
    width: 100%;
  }

  &__list {
    display: flex;
    margin-top: 10px;

    color: #ffffff;
    list-style-type: none;

    @media (max-width: 1300px) {
      margin-top: 0;
    }

    &-item {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__item-link {
    display: inline-block;
    width: 26px;
    height: 26px;

    border-radius: 50%;
    border: 1px solid #ffffff;
    text-align: center;

    &:hover {
      filter: drop-shadow(0px 0px 4px #01bdf9);
    }

    &:active {
      border: 1px solid #98e6ff;
      filter: none;

      & .social__item-icon {
        fill: #98e6ff;
      }
    }
  }
}

.vk svg {
  margin-bottom: 1px;
}

.facebook svg {
  margin-bottom: -1px;
}

.instagram svg {
  margin-bottom: -1px;
}

.mobileStore__list {
  display: flex;

  list-style-type: none;

  @media (max-width: 1200px) {
  }

  &-item {
    display: inline-block;
    margin-right: 21px;

    @media (max-width: 1300px) {
      margin-right: 14px;
      width: 113px;
    }

    &:last-child {
      margin-right: 0;
    }

    & img {
      width: 100%;
    }
  }
}

@media (max-width: 1300px) {
  .social {
    &__list {
      &-item {
        margin-right: 19px;
      }
    }
  }
}

@media (max-width: 725px) {
  .social {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
