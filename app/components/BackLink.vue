<script setup lang="ts">
import { ref,defineProps } from 'vue'
import { navigateTo } from '#app';
import { useRouter } from 'vue-router'
const router = useRouter()
const text = ref('Назад')

const props = defineProps({
  type: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: "/"
  },
})


const returnPage = () => {
  router.push(props.url);
 //router.replace({ path: props.url })
}

const calcScreenSize = () => {
  // if (window.innerWidth <= 725) {
  //   const arrCurrentUrl = window.location.href.split('/')
  //
  //   for (let i = 0; i < arrCurrentUrl.length; i++) {
  //     console.log(arrCurrentUrl[i]);
  //     if (arrCurrentUrl[i] === "reservation") {
  //       text.value = 'Выйти из сервиса бронирования'
  //       break
  //     } else if (
  //         arrCurrentUrl[i] === "StudentCard" ||
  //         arrCurrentUrl[i] === "KidsCard" ||
  //         arrCurrentUrl[i] === "JazzCard"
  //     ) {
  //       text.value = 'Назад'
  //       break
  //     } else if (arrCurrentUrl[i] === "filmDetails") {
  //       text.value = 'Выйти из карточки фильма'
  //       break
  //     }
  //   }
  // }
}
</script>




<template>
  <div class="back-link" :class="{white: type == 'white'}">
    <div class="text_link" :class="{white: type == 'white'}"  @click="returnPage">{{ text }}
      <svg width="254" height="8" viewBox="0 0 254 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.646454 3.64647C0.451187 3.84173 0.451187 4.15831 0.646454 4.35358L3.82843 7.53556C4.0237 7.73082 4.34027 7.73082 4.53554 7.53556C4.73079 7.34029 4.73079 7.02371 4.53554 6.82845L1.70711 4.00002L4.53554 1.17159C4.73079 0.976333 4.73079 0.65975 4.53554 0.464488C4.34027 0.269226 4.0237 0.269226 3.82843 0.464488L0.646454 3.64647ZM254 3.5L1 3.50002L1 4.50002L254 4.5L254 3.5Z"/>
      </svg>
    </div>
  </div>
</template>


<style lang="scss">
.white {
  color: #ffffff;
}
.back-link {
  position: absolute;
  right: calc(11.3% - 124px);
  bottom: 49px;

  display: inline-block;

  font-family: "NEXT ART";
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  text-align: right;
  cursor: pointer;

  transform: translate(-50%);

  @media (max-width: 1300px) {
    //right: calc(11.3% - 190px);
    right: 24px;
    transform: none;
  }

  @media (max-width: 725px) {
    position: relative;
    right: 0;
    bottom: 0;
    display: block;
    padding-bottom: 47px;
    text-align: center;
    background: #161616;
  }

  & span {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #1c1c1c;

    @media (max-width: 725px) {
      position: relative;
      display: inline-flex;
      font-family: 'Montserrat';
      font-size: 13px;
      font-weight: 700;
      line-height: 16px;
      text-align: center;
      //text-decoration: underline;
      border-bottom: 1px solid #1c1c1c;
      color: #fff;
    }
  }


  & svg {
    margin-top: 4px;

    fill: #1C1C1C;

    transition: all 0.3s;

    @media (max-width: 725px) {
      display: none;
    }
  }

  &.white {
    & a {
      color: #FFFFFF;
      text-transform: lowercase;
    }

    & svg {
      fill: #FFFFFF;
    }
  }
}

.halls {
  & .back-link {
    & a {
      @media (max-width: 725px) {
        border-bottom: 1px solid #fff;
      }
    }
  }
}
.text_link {
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover > svg {
    transform: translateX(-10%);
  }
}
</style>
