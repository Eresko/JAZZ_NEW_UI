<script setup lang="ts">
import { ref,defineEmits,reactive,defineProps,onMounted } from 'vue'
import { useProfileStore } from '@/store/profile'
const profileStore = useProfileStore();
const currentProfile = reactive({name:'',email:'',phone:'',birthday:'',gender:0})
const repeatPassword = ref(false)
const hidePassword = ref(false)
const update = async (type:string,val:string) => {
  if(type == 'password') {
    repeatPassword.value = false;
    hidePassword.value = true;
    if (currentProfile.password.length == 0 ) {
      return false;
    }
  }
  await profileStore.SET_PROFILE({[type]:val})
  await profileStore.FETCH_PROFILE()
  await updateProfile()
}

const changeHidePassword = () => {
  hidePassword.value = !hidePassword.value
}
const updatePassword = () => {
  repeatPassword.value = !repeatPassword.value
}
const updateProfile = () => {
  currentProfile.name = profileStore.GET_FETCH_PROFILE.name
  currentProfile.email = profileStore.GET_FETCH_PROFILE.email
  currentProfile.phone = profileStore.GET_FETCH_PROFILE.phone
  currentProfile.birthday = profileStore.GET_FETCH_PROFILE.birthday
  currentProfile.gender = profileStore.GET_FETCH_PROFILE.gender
}
const changeGender = (val:number) => {
  currentProfile.gender = val;
}

onMounted(async () => {
  updateProfile()
})




</script>
<template>
  <section class="profile">
    <div class="container">
      <form class="profile__form">
        <h2 class="profile__form-title">Редактировать профиль</h2>

        <div class="profile__form-item">
          <fieldset class="profile__form-fieldset">
            <input id="name" class="profile__form-input" type="text" placeholder="Иванов Иван Иванович" v-model="currentProfile.name">

            <label for="name" class="profile__form-label">ФИО</label>
          </fieldset>

          <div class="change-text" @click="update('fio',currentProfile.name)">
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Введите фамилию, имя и отчество</p>
        </div>

        <div class="profile__form-item">
          <fieldset class="profile__form-fieldset">
            <input id="phone" class="profile__form-input" type="tel" placeholder="+7(___)___-__-__" :value="currentProfile.phone" readonly>

            <label for="phone" class="profile__form-label">
              <span class="text-desktop">Номер телефона</span>
              <span class="text-mobile">Tелефон</span>
            </label>
          </fieldset>

          <!--          <button class="change-text">Внести изменения</button>-->

          <div class="change-text">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0389 1.50805C12.3642 1.18275 12.8054 1 13.2654 1C13.4932 1 13.7188 1.04487 13.9292 1.13204C14.1397 1.21921 14.3309 1.34698 14.492 1.50805C14.653 1.66912 14.7808 1.86034 14.868 2.07079C14.9551 2.28124 15 2.5068 15 2.73459C15 2.96238 14.9551 3.18794 14.868 3.39839C14.7808 3.60884 14.653 3.80006 14.492 3.96113L4.27078 14.1823L1 15L1.81769 11.7292L12.0389 1.50805Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Введите номер телефона</p>
        </div>

        <div class="profile__form-item">
          <fieldset class="profile__form-fieldset">
            <input id="mail" class="profile__form-input" type="email" placeholder="ivanov_1234567@yandex.ru" v-model="currentProfile.email">

            <label for="mail" class="profile__form-label">Email</label>
          </fieldset>

          <div class="change-text" @click="update('email',currentProfile.email)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0389 1.50805C12.3642 1.18275 12.8054 1 13.2654 1C13.4932 1 13.7188 1.04487 13.9292 1.13204C14.1397 1.21921 14.3309 1.34698 14.492 1.50805C14.653 1.66912 14.7808 1.86034 14.868 2.07079C14.9551 2.28124 15 2.5068 15 2.73459C15 2.96238 14.9551 3.18794 14.868 3.39839C14.7808 3.60884 14.653 3.80006 14.492 3.96113L4.27078 14.1823L1 15L1.81769 11.7292L12.0389 1.50805Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Введите Email</p>
        </div>

        <div class="profile__form-item">
          <fieldset class="profile__form-fieldset">
            <input id="birthday" class="profile__form-input" type="text" placeholder="03.02.1900" v-model="currentProfile.birthday">

            <label for="birthday" class="profile__form-label">Дата рождения</label>
          </fieldset>

          <div class="change-text" @click="update('datebirth',currentProfile.birthday)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0389 1.50805C12.3642 1.18275 12.8054 1 13.2654 1C13.4932 1 13.7188 1.04487 13.9292 1.13204C14.1397 1.21921 14.3309 1.34698 14.492 1.50805C14.653 1.66912 14.7808 1.86034 14.868 2.07079C14.9551 2.28124 15 2.5068 15 2.73459C15 2.96238 14.9551 3.18794 14.868 3.39839C14.7808 3.60884 14.653 3.80006 14.492 3.96113L4.27078 14.1823L1 15L1.81769 11.7292L12.0389 1.50805Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Введите дату рождения</p>
        </div>

        <div class="profile__form-item">
          <fieldset class="profile__form-fieldset">
            <input id="password" class="profile__form-input" type="password" placeholder="***********" v-model="currentProfile.password" v-if="hidePassword">
            <input  class="profile__form-input" type="text"  v-model="currentProfile.password" v-else>

            <label for="password" class="profile__form-label">Пароль</label>

            <svg class="show-password pass-icon" width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg" @click="changeHidePassword()">
              <path d="M13.3748 15.5C18.3611 15.5 22.6973 12.72 24.9186 8.625C23.7925 6.54512 22.1253 4.80823 20.0933 3.59803C18.0613 2.38782 15.7399 1.7493 13.3748 1.75C11.0097 1.7493 8.68834 2.38782 6.6563 3.59803C4.62426 4.80823 2.95707 6.54512 1.83105 8.625C2.95707 10.7049 4.62426 12.4418 6.6563 13.652C8.68834 14.8622 11.0097 15.5007 13.3748 15.5ZM13.3748 0.500001C16.0791 0.499097 18.7287 1.26102 21.0195 2.69825C23.3102 4.13548 25.149 6.18972 26.3248 8.625C25.149 11.0603 23.3102 13.1145 21.0195 14.5518C18.7287 15.989 16.0791 16.7509 13.3748 16.75C10.6705 16.7509 8.02087 15.989 5.73015 14.5518C3.43943 13.1145 1.60057 11.0603 0.424805 8.625C1.60057 6.18972 3.43943 4.13548 5.73015 2.69825C8.02087 1.26102 10.6705 0.499097 13.3748 0.500001ZM13.3748 3C14.8666 3 16.2974 3.59263 17.3523 4.64753C18.4072 5.70242 18.9998 7.13316 18.9998 8.625C18.9998 10.1168 18.4072 11.5476 17.3523 12.6025C16.2974 13.6574 14.8666 14.25 13.3748 14.25C11.883 14.25 10.4522 13.6574 9.39733 12.6025C8.34244 11.5476 7.7498 10.1168 7.7498 8.625C7.7498 7.13316 8.34244 5.70242 9.39733 4.64753C10.4522 3.59263 11.883 3 13.3748 3ZM13.3748 4.25C12.2145 4.25 11.1017 4.71094 10.2812 5.53141C9.46074 6.35188 8.9998 7.46468 8.9998 8.625C8.9998 9.78532 9.46074 10.8981 10.2812 11.7186C11.1017 12.5391 12.2145 13 13.3748 13C14.5351 13 15.6479 12.5391 16.4684 11.7186C17.2889 10.8981 17.7498 9.78532 17.7498 8.625C17.7498 7.46468 17.2889 6.35188 16.4684 5.53141C15.6479 4.71094 14.5351 4.25 13.3748 4.25Z" fill="#8B8B8B" fill-opacity="0.2"/>
            </svg>

            <svg class="hide-password pass-icon" width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.17855 0.88375L3.0623 0L23.9998 20.9375L23.1161 21.8213L18.9311 17.6362C17.2223 18.3537 15.3436 18.75 13.3748 18.75C10.6705 18.7509 8.02087 17.989 5.73015 16.5518C3.43943 15.1145 1.60057 13.0603 0.424805 10.625C1.63184 8.1336 3.52973 6.04176 5.8923 4.59875L2.17855 0.88375ZM13.3748 17.5C14.9911 17.5 16.5386 17.2075 17.9686 16.6738L16.5573 15.2638C15.4744 16.0067 14.1656 16.3473 12.8579 16.2265C11.5502 16.1057 10.326 15.5312 9.39742 14.6025C8.46887 13.6738 7.89454 12.4495 7.77397 11.1417C7.6534 9.83401 7.99421 8.52532 8.7373 7.4425L6.8048 5.51C4.70795 6.72544 2.9866 8.49523 1.8298 10.625C2.95592 12.7051 4.62331 14.4421 6.65559 15.6523C8.68787 16.8625 11.0095 17.5009 13.3748 17.5ZM24.9186 10.625C23.7925 8.54512 22.1253 6.80823 20.0933 5.59803C18.0613 4.38782 15.7399 3.7493 13.3748 3.75C11.9711 3.74829 10.5763 3.97197 9.24355 4.4125L8.2648 3.435C9.89703 2.81489 11.6288 2.49802 13.3748 2.5C16.0791 2.4991 18.7287 3.26102 21.0195 4.69825C23.3102 6.13548 25.149 8.18972 26.3248 10.625C25.1849 12.9782 23.4274 14.9777 21.2398 16.41L20.3348 15.505C22.257 14.2996 23.8358 12.6188 24.9186 10.625ZM13.3748 5C14.3611 4.99975 15.3301 5.25884 16.1847 5.75128C17.0392 6.24371 17.7493 6.95219 18.2436 7.80565C18.738 8.6591 18.9992 9.62754 19.0012 10.6138C19.0032 11.6001 18.7458 12.5696 18.2548 13.425L17.3298 12.5C17.7179 11.6841 17.8438 10.768 17.6903 9.8776C17.5368 8.98722 17.1114 8.16619 16.4725 7.52731C15.8336 6.88842 15.0126 6.46301 14.1222 6.3095C13.2318 6.156 12.3157 6.28193 11.4998 6.67L10.5748 5.745C11.4266 5.25533 12.3923 4.9984 13.3748 5ZM8.9998 10.625C8.99961 11.4022 9.20646 12.1654 9.59906 12.8361C9.99166 13.5069 10.5558 14.0609 11.2336 14.4413C11.9113 14.8217 12.6782 15.0146 13.4552 15.0003C14.2323 14.986 14.9915 14.765 15.6548 14.36L9.6398 8.345C9.21997 9.03129 8.99844 9.82047 8.9998 10.625Z" fill="#8B8B8B" fill-opacity="0.2"/>
            </svg>
          </fieldset>

          <div class="change-text" @click="updatePassword">
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Введите пароль</p>
        </div>

        <div class="profile__form-item " :class="{ 'repeat-password' : !repeatPassword}">
          <fieldset class="profile__form-fieldset">
            <input id="repeat-password" class="profile__form-input" type="password" placeholder="***********"  v-if="hidePassword">
            <input  class="profile__form-input" type="text"  v-model="currentProfile.password" v-else>

            <label for="repeat-password" class="profile__form-label">Подтвердите пароль</label>
          </fieldset>

          <div class="change-text" @click="update('password',currentProfile.password)">
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Повторите ввод пароля</p>
        </div>

        <div class="profile__form-item">
          <fieldset class="profile__form-fieldset">
            <span class="profile__form-label">Пол:</span>

            <button class="sex-btn" :class="{ active : (currentProfile.gender != 1) } " type="button" @click="changeGender(0)">
              <svg width="13" height="29" viewBox="0 0 13 29" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66667 26.8333C8.66667 28.03 7.69662 29 6.5 29C5.30338 29 4.33333 28.03 4.33333 26.8333V22.1032C4.33333 21.0998 3.5199 20.2864 2.51647 20.2864C1.27759 20.2864 0.40205 19.0737 0.791916 17.8978L3.65625 9.25822C3.83681 8.62285 4.18663 8.12363 4.70573 7.76056C5.22483 7.3975 5.77778 7.21596 6.36458 7.21596H6.56771C7.19965 7.21596 7.76389 7.3975 8.26042 7.76056C8.75694 8.12363 9.09549 8.62285 9.27604 9.25822L12.1929 17.8964C12.5893 19.0701 11.7163 20.2864 10.4774 20.2864C9.47736 20.2864 8.66667 21.0971 8.66667 22.0971V26.8333ZM6.46615 5.78639C5.67622 5.78639 4.99913 5.50274 4.4349 4.93545C3.87066 4.36815 3.58854 3.6874 3.58854 2.89319C3.58854 2.09898 3.87066 1.41823 4.4349 0.850939C4.99913 0.283646 5.67622 0 6.46615 0C7.25608 0 7.93316 0.283646 8.4974 0.850939C9.06163 1.41823 9.34375 2.09898 9.34375 2.89319C9.34375 3.6874 9.06163 4.36815 8.4974 4.93545C7.93316 5.50274 7.25608 5.78639 6.46615 5.78639Z"/>
              </svg>
            </button>

            <button class="sex-btn" :class="{ active : (currentProfile.gender == 1) } "  type="button" @click="changeGender(1)">
              <svg width="11" height="29" viewBox="0 0 11 29" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.0716 29C3.47373 29 2.1784 27.7047 2.1784 26.1068V19.1972C2.1784 18.5956 1.69075 18.108 1.0892 18.108C0.487652 18.108 0 17.6203 0 17.0188V10.1432C0 9.32629 0.283646 8.63419 0.850939 8.0669C1.41823 7.49961 2.11033 7.21596 2.92723 7.21596H7.28404C8.05556 7.21596 8.72496 7.49961 9.29225 8.0669C9.85955 8.63419 10.1432 9.32629 10.1432 10.1432V14.1256V17.0188C10.1432 17.6203 9.65554 18.108 9.05399 18.108C8.45244 18.108 7.96479 18.5956 7.96479 19.1972V26.1068C7.96479 27.7047 6.66946 29 5.0716 29ZM5.0716 5.78639C4.27739 5.78639 3.59664 5.50274 3.02934 4.93545C2.46205 4.36815 2.1784 3.6874 2.1784 2.89319C2.1784 2.09898 2.46205 1.41823 3.02934 0.850939C3.59664 0.283646 4.27739 0 5.0716 0C5.86581 0 6.54656 0.283646 7.11385 0.850939C7.68114 1.41823 7.96479 2.09898 7.96479 2.89319C7.96479 3.6874 7.68114 4.36815 7.11385 4.93545C6.54656 5.50274 5.86581 5.78639 5.0716 5.78639Z"/>
              </svg>
            </button>
          </fieldset>

          <div class="change-text" @click="update('gender',currentProfile.gender)">
            <span>Внести изменения</span>
          </div>

          <p class="help-text">Укажите Ваш пол</p>
        </div>
      </form>
    </div>
  </section>
</template>


<style lang="scss">
.profile {
  margin-bottom: 137px;
  padding-top: 51px;

  font-family: 'Montserrat';
  color: #FFFFFF;

  @media (max-width: 725px) {
    margin-bottom: 29px;
  }

  &__form {
    width: 100%;
    padding: 50px 35px 44px;

    background: #1C1C1C;
    border: 1px solid rgba(139, 139, 139, 0.2);
    border-radius: 20px;

    @media (max-width: 1199px) {
      padding: 50px 35px 44px;
    }

    @media (max-width: 725px) {
      margin-left: 11px;
      margin-right: 10px;
      padding: 17px 17px 31px 10px;
    }

    &-title {
      margin-bottom: 65px;

      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;

      @media (max-width: 725px) {
        margin-bottom: 38px;
        font-size: 16px;
        line-height: 20px;
      }
    }

    &-item {
      position: relative;
      display: flex;
      align-items: center;

      margin-bottom: 52px;

      @media (max-width: 725px) {
        margin-bottom: 29px;
        height: 19px;
      }

      &:first-child {
        @media (max-width: 725px) {
          height: 22px;
        }
      }

      &:last-child {
        margin: 0;
        @media (max-width: 725px) {
          height: auto;
        }

        & .profile__form-fieldset {
          border-bottom: none;
        }
      }

      &.repeat-password {
        display: none;
      }

      &:nth-of-type(5) {
        @media (max-width: 725px) {
          margin-bottom: 15px;
        }
      }
    }

    &-fieldset {
      position: relative;

      width: 57.5%;
      margin: 0;
      margin-right: 43px;
      padding: 0;
      padding-left: 198px;

      border: none;
      border-bottom: 1px solid rgba(139, 139, 139, 0.2);

      @media (max-width: 1179px) {
        margin-right: 28px;
        width: 73.5%;
      }

      @media (max-width: 725px) {
        display: flex;
        flex-direction: row-reverse;
        margin-right: 0;
        padding-left: 0;
        width: 100%;
      }

      &:last-of-type {
        @media (max-width: 725px) {
          flex-direction: row;
          justify-content: flex-end;
        }
      }

      .pass-icon {
        position: absolute;
        top: 0;
        right: 10px;

        cursor: pointer;

        @media (max-width: 725px) {
          top: -4px;
          right: 0;
          width: 23px;
        }
      }

      .hide-password {
        display: none;
      }

      .sex-btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: 39px;
        height: 39px;

        text-align: center;

        background: none;
        border: 1px solid rgb(139, 139, 139);
        border-radius: 20px;
        opacity: 0.2;
        cursor: pointer;

        @media (max-width: 725px) {
          width: 33px;
          height: 33px;
        }

        &:first-of-type {
          margin-right: 15px;
        }

        svg {
          fill: #8B8B8B;

          @media (max-width: 725px) {
            height: 24px;
          }
        }

        &.active {
          border: 1px solid #01BDF9;
          opacity: 1;

          svg {
            fill: #01BDF9;
          }
        }

        &:hover {
          border: 1px solid #01BDF9;
          filter: drop-shadow(0px 0px 4px #01BDF9);
          opacity: 1;

          @media (max-width: 1179px) {
            filter: none;
          }

          svg {
            fill: #01BDF9;
          }
        }

        &:active {
          border: 1px solid #98E6FF;
          filter: none;

          svg {
            fill: #98E6FF;
          }
        }
      }
    }

    &-input {
      width: 100%;

      font-family: 'Montserrat';
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #FFFFFF;

      background: inherit;
      border: none;
      outline: none;

      @media (max-width: 1199px) {
        font-size: 16px;
      }

      @media (max-width: 725px) {
        margin-right: 41px;
        padding-bottom: 6px;
        font-size: 13px;
        line-height: 16px;
        text-align: right;
      }

      &::placeholder {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: rgba(139, 139, 139, 0.2);

        @media (max-width: 725px) {
          font-size: 13px;
          line-height: 16px;
          text-align: right;
        }
      }
    }

    &-label {
      position: absolute;
      top: 50%;
      left: 20px;

      transform: translateY(-50%);

      @media (max-width: 725px) {
        left: 0;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
      }

      & .text-desktop {
        @media (max-width: 725px) {
          display: none;
        }
      }

      & .text-mobile {
        display: none;
        @media (max-width: 725px) {
          display: flex;
        }
      }
    }

    .change-text {
      font-family: 'Montserrat';
      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
      text-decoration-line: underline;
      color: #8B8B8B;

      border: none;
      background: none;
      outline: none;
      cursor: pointer;

      @media (max-width: 1179px) {
        font-size: 13px;
        line-height: 16px;
      }

      @media (max-width: 725px) {
        position: absolute;
        right: 0;
        bottom: 8px;
      }

      & svg {
        display: none;
        @media (max-width: 725px) {
          display: flex;
          width: 14px;
          height: 14px;
        }
      }

      & span {
        @media (max-width: 725px) {
          display: none;
        }
      }
    }

    .help-text {
      display: none;

      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
      color: #FFFFFF;
    }
  }
}
</style>