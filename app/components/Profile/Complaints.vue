<script setup lang="ts">
import { ref,defineEmits,reactive,defineProps,onMounted } from 'vue'
import { useSendMessageStore } from '@/store/sendMessage'
const sendMessageStore = useSendMessageStore();
const complaintsTab = ref(2)
const checkEmail = ref(false)
const theme = ref ()
const message = ref()
const photo = reactive({image:null,imageUrl:null})
const numberAppeal = ref('')

const toggleComplaintsTab = (val) => {
  complaintsTab.value = val
}
const complaints = reactive({checkEmail:false,theme:'',message:'',complaintsTab:'',imgFile:null,imgPreviewUrl:null})
const sendMessage = () => {
  const formData = new FormData()
  formData.append('email', complaints.checkEmail ? 'YES' : 'NO')
  formData.append('theme', complaints.theme)
  formData.append('message', complaints.message)
  formData.append('format', complaints.complaintsTab == 2 ? 'Предложение' : 'Жалоба')
  if (complaints.imgFile) {
    formData.append('file', complaints.imgFile)
  }
  sendMessageStore.SEND_MESSAGE(formData)
  reset()
}
const reset = () => {
  complaints.checkEmail = false;
  complaints.theme = '';
  complaints.message = '';
  complaints.complaintsTab = '';
  complaints.imgFile = null;
  complaints.imgPreviewUrl = null;
}

const uploadFile = (e) => {
  const file = e.target.files[0]
  if (file) {
    complaints.imgFile = file; // сохраняем файл для отправки
    complaints.imgPreviewUrl = URL.createObjectURL(file); // для показа превью
  }
}



</script>
<template>
  <section class="complaints">
    <div class="container">
      <div class="complaints__wrapper">
        <h2 class="complaints__title">Жалобы и предложения</h2>

        <p class="complaints__text">
          Мы дорожим нашими посетителями и хотим чтобы вам было комфортно в нашем кинотеатре! Если у вас возникнут какие либо жалования или предложения, сотрудник кинотеатра ответит вам в течение дня (или чуточку позже, если вы написали нам во время выходных или праздничных дней).
        </p>

        <form  class="complaints__form" @submit.prevent="sendMessage">
          <div class="complaints__form-control">
            <button class="complaints__form-control-btn" type="button" @click="toggleComplaintsTab(1)" :class="{active:complaintsTab==1}">жалоба</button>

            <button class="complaints__form-control-btn" type="button" @click="toggleComplaintsTab(2)" :class="{active:complaintsTab==2}">предложение</button>
          </div>

          <input class="complaints__form-topic complaints__form-inputs" type="text" placeholder="Тема предложения" v-model="complaints.theme" required>

          <textarea class="complaints__form-text complaints__form-inputs" name="complaints-text" placeholder="Ваше предложение" v-model="complaints.message" required></textarea>

          <label class="upload-label">
            <input class="complaints__form-input" type="file" @change="uploadFile">

            <p class="complaints__form-upload" for="my-file">Загрузить фотографию</p>
          </label>

          <div id="preview" class="upload__img">
            <p v-if="complaints.imgFile">Файл прикреплен</p>

          </div>

          <label class="email-label">
            <input class="complaints__form-input" type="checkbox" v-model="complaints.checkEmail">

            <span class="custom-checkbox"></span>

            <p class="email-text">Получить ответ на e-mail</p>
          </label>

          <button class="submit-form-btn" type="submit">отправить</button>
        </form>
      </div>
    </div>
  </section>
</template>


<style lang="scss">
.complaints {
  margin-top: 51px;
  margin-bottom: 137px;

  font-family: 'Montserrat';
  color: #FFFFFF;

  @media (max-width: 1300px) {
    margin-top: 56px;
    margin-bottom: 86px;
  }

  @media (max-width: 725px) {
    margin-top: 0;
    margin-bottom: 32px;
  }

  &__wrapper {
    padding: 48px 55px 70px;

    background: #1C1C1C;
    border: 1px solid rgba(139, 139, 139, 0.2);
    border-radius: 20px;

    @media (max-width: 725px) {
      margin-top: 62px;
      margin-left: 11px;
      margin-right: 10px;
      padding: 17px 10px 60px;
    }
  }

  &__title {
    margin-bottom: 65px;

    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    @media (max-width: 725px) {
      margin-bottom: 17px;
      font-size: 16px;
      line-height: 20px;
    }
  }

  &__text {
    margin-bottom: 51px;
    padding-bottom: 5px;

    font-weight: 400;
    font-size: 15px;
    line-height: 30px;

    border-bottom: 1px solid rgba(139, 139, 139, 0.2);

    @media (max-width: 725px) {
      margin-bottom: 42px;
      padding-bottom: 0;
      font-size: 13px;
      line-height: 30px;
      border-bottom: none;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;

    &-control {
      margin-bottom: 27px;

      @media (max-width: 725px) {
        margin-left: 5px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
      }

      &-btn {
        position: relative;
        margin-right: 43px;
        padding: 0;

        font-family: 'NEXT ART';
        font-weight: 400;
        font-size: 16px;
        line-height: 17px;
        text-transform: uppercase;
        color: #FFFFFF;

        cursor: pointer;
        border: none;
        background: none;

        @media (max-width: 725px) {
          margin-right: 0;
          padding-top: 0;
          padding-left: 0;
          height: 17px;
        }

        &.active {
          font-weight: 600;
          color: #01BDF9;

          &::after {
            content:'';
            position: absolute;
            bottom: 1px;
            left: 0;
            width: 100%;
            height: 0.5px;
            background-color: #01BDF9;
          }
        }

        &:hover {
          color: #01BDF9;
          text-shadow: 0px 0px 4px #01BDF9;
        }

        &:active {
          color: #98E6FF;
          text-shadow: none;
        }

        &::after {
          content:'';
          position: absolute;
          bottom: 1px;
          left: 0;
          width: 100%;
          height: 0.5px;
          background-color: #fff;
        }
      }
    }

    &-inputs {
      padding: 10px;

      font-family: 'Montserrat';
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: #FFFFFF;

      background: linear-gradient(91.69deg, #262525 27.19%, rgba(28, 28, 28, 0) 91.82%);
      border: 1px solid #8B8B8B;
      border-radius: 7px;
      outline: none;

      @media (max-width: 725px) {
        margin-left: 5px;
        padding: 9px;
      }
    }

    &-topic {
      max-width: 375px;
      margin-bottom: 25px;

      @media (max-width: 1300px) {
        max-width: none;
        width: 100%;
      }

      @media (max-width: 725px) {
        margin-bottom: 13px;
        width: auto;
      }

    }

    &-text {
      height: 164px;
      margin-bottom: 9px;

      resize: none;

      @media (max-width: 725px) {
        margin-bottom: 17px;
      }
    }

    .upload-label {
      //margin-bottom: 36px;
      width: 205px;
    }

    &-input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    &-upload {
      position: relative;
      display: inline-block;

      font-weight: 400;
      font-size: 14px;
      line-height: 17px;

      cursor: pointer;

      @media (max-width: 725px) {
        margin-left: 5px;
      }

      &::after {
        content:'';
        position: absolute;
        bottom: 1px;
        left: 0;
        width: 100%;
        height: 0.5px;
        background-color: #fff;
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

    .email-label {
      position: relative;
      display: inline-flex;

      margin-bottom: 32px;
      width: 205px;

      cursor: pointer;

      @media (max-width: 725px) {
        margin-left: 5px;
      }
    }

    .custom-checkbox {
      position: absolute;
      top: 2px;
      left: 4px;
      display: none;

      width: 8px;
      height: 8px;

      border-left: 1px solid #8B8B8B;
      border-bottom: 1px solid #8B8B8B;
      transform: rotate(-45deg);
    }

    .email-text {
      display: flex;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
    }

    .email-text::before {
      content: '';
      display: inline-block;
      width: 15px;
      height: 14px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #8B8B8B;
      border-radius: 1px;
      margin-right: 5px;
    }

    .complaints__form-input:checked+.custom-checkbox {
      display: inline;
    }

    .submit-form-btn {
      align-self: flex-start;

      height: 45px;
      min-width: 260px;
      padding: 0 15px;

      font-family: 'NEXT ART';
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      text-transform: uppercase;
      color: #FFFFFF;

      cursor: pointer;
      border: 1px solid #FFFFFF;
      border-radius: 50px;
      background: none;

      @media (max-width: 725px) {
        margin: auto;
      }

      &:hover {
        color: #01BDF9;
        text-shadow: 0px 0px 4px #01BDF9;

        border: 1px solid #01BDF9;
        filter: drop-shadow(0px 0px 4px #01BDF9);
      }

      &:active {
        color: #98E6FF;
        text-shadow: none;
        border: 1px solid #98E6FF;
        filter: none;
      }
    }
  }
}

.upload__img {
  margin-bottom: 36px;
  width: 168px;
  height: auto;

  & img {
    margin-top: 36px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    box-shadow: 0px 4px 20px 11px rgba(1, 178, 235, 0.19);
  }
}
</style>
