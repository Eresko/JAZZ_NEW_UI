<template>
  <section class="club">
    <div class="container">
      <h1 class="club__title">Киноклуб PS</h1>

      <div class="club__info">
        <div class="club__text">
          <p class="club__text-paragraph">
            Jazz Cinema – уютный кинотеатр в г. Магнитогорске. Он работает в торговом центре «Jazz Mall» с 2007 года. Для посетителей открыто 6 кинозалов на 1126 мест. Вместимость залов от 50 до 300 зрителей. Каждый зал оформлен в современном стиле, располагающем к комфортному отдыху. Ряды кресел Destro SPA расположены на значительном расстоянии друг от друга, что позволяет зрителям устроиться максимально удобно. Широкоформатные экраны делают изображение ярким и четким.
          </p>

          <svg class="club__text-img" width="331" height="230" viewBox="0 0 331 230" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="331" height="230" fill="#C4C4C4"/>
            <path d="M116.528 116.391L52 192.128H245.583L197.187 131.539L164.439 172.588L116.528 116.391ZM229.451 48.2279C229.451 35.6556 218.643 25.5068 205.253 25.5068C191.864 25.5068 181.055 35.6556 181.055 48.2279C181.055 60.8003 191.864 70.949 205.253 70.949C218.643 70.949 229.451 60.8003 229.451 48.2279Z" fill="#E0E0E0"/>
          </svg>
        </div>

        <div class="club__text">
          <p class="club__text-paragraph">
            Каждый зал оснащен современной системой звуковоспроизведения Dolby Digital Surround EX, создающей объемное и реалистичное звучание. Залы оборудованы мягкими креслами. Каждую неделю мы подбираем такую программу, которая заинтересует большинство. Jazz Cinema предлагает не просто кино, но и события — тематические показы с лекторами, конференции, событийные мероприятия городского уровня. Помимо актуальных новинок и популярных кассовых фильмов здесь транслируется авангардное кино для настоящих ценителей киноискусства.
          </p>

          <svg class="club__text-img" width="331" height="230" viewBox="0 0 331 230" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="331" height="230" fill="#C4C4C4"/>
            <path d="M116.528 116.391L52 192.128H245.583L197.187 131.539L164.439 172.588L116.528 116.391ZM229.451 48.2279C229.451 35.6556 218.643 25.5068 205.253 25.5068C191.864 25.5068 181.055 35.6556 181.055 48.2279C181.055 60.8003 191.864 70.949 205.253 70.949C218.643 70.949 229.451 60.8003 229.451 48.2279Z" fill="#E0E0E0"/>
          </svg>
        </div>

        <NuxtLink class="club__text-ps" to="#">
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="29" cy="29" r="27.5" stroke="#1C1C1C" stroke-width="3"/>
            <path d="M15.083 27.2998V21.6455H21.1768C22.8467 21.6455 24.3115 22.8174 24.3115 24.4727C24.3115 26.2305 22.7295 27.2998 21.1914 27.2998H15.083ZM11.582 18.3936V39.3848H15.083V30.4785H21.6016C25.0879 30.4785 27.7539 27.8711 27.7539 24.4727C27.7539 20.8105 24.9854 18.4082 21.6016 18.3936H11.582ZM29.4531 35.708C32.4121 38.3008 35.6055 39.3701 38.4033 39.3701C42.915 39.3848 46.4307 36.7188 46.4307 33.0859C46.4307 25.0586 33.1885 28.8818 33.1885 24.2676C33.1885 22.3926 34.9609 21.5576 37.1875 21.5576C39.0918 21.5576 41.333 22.2021 42.9004 23.3447L44.8926 20.8838C42.5488 19.1992 39.7363 18.3789 37.1729 18.3789C33.1006 18.3936 29.7168 20.415 29.7168 24.5166C29.7168 32.1045 42.9736 28.6328 42.9736 33.1006C42.9736 34.8877 40.9521 36.1768 38.3154 36.1621C36.2354 36.1621 33.7598 35.3418 31.6064 33.3057L29.4531 35.708Z" fill="#1C1C1C"/>
          </svg>

          <p class="club__text-ps__text">Киноклуб PS в соцсетях</p>

        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.club {
  padding-top: 85px;

  @media (max-width: 1300px) {
    padding-top: 73px;
  }

  @media (max-width: 725px) {
    padding-top: 30px;
    background: #fff;
    box-shadow: inset 0px 14px 14px -13px rgba(0,0,0,0.75);
  }

  & .container {
    @media (max-width: 725px) {
      flex-direction: column;
    }
  }

  &__title  {
    max-width: 198px;
    font-family: "NEXT ART";
    font-weight: 600;
    font-size: 26px;
    line-height: 28px;
    color: #FFFFFF;
    text-transform: uppercase;

    @media (max-width: 1300px) {
      display: contents;
      width: 100%;
      max-width: none;
      font-size: 23px;
      line-height: 25px;
    }

    @media (max-width: 725px) {
      display: block;
      font-family: 'Montserrat';
      font-size: 16px;
      line-height: 19px;
      font-weight: 700;
      text-align: center;
      color: #01BDF9;
      text-transform: none;
    }

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 166px;

      width: 20%;
      height: 1px;

      background-color: #FFFFFF;

      @media (max-width: 1900px) {
        width: 23%;
      }

      @media (max-width: 1360px) {
        width: 26%;
      }

      @media (max-width: 1300px) {
        top: 154px;
        width: 147px;
      }

      @media (max-width: 725px) {
        display: none;
      }
    }
  }

  &__info {
    width: 74%;
    padding: 5px 0 0 91px;
    margin-bottom: 30px;

    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    line-height: 30px;
    color: #1C1C1C;

    @media (max-width: 1300px) {
      padding: 9px 0 0 61px;
    }

    @media (max-width: 725px) {
      margin-bottom: 40px;
      padding: 19px 10px 0;
      width: 100%;
      font-size: 12px;
      line-height: 25px;
    }
  }

  &__text {
    position: relative;

    margin-bottom: 130px;

    @media (min-width: 1920px) {
      max-width: 1010px;
    }

    @media (max-width: 1500px) {
      margin-bottom: 70px;
    }

    @media (max-width: 1257px) {
      margin-bottom: 0;
    }

    @media (max-width: 725px) {
      margin-bottom: 30px;
    }

    &:last-of-type {
      margin-bottom: 30px;

      @media (max-width: 725px) {
        margin-bottom: 8px;
      }
    }

    &-paragraph {
      @media (max-width: 725px) {
        margin-bottom: 17px;
      }
    }

    &-img {
      position: absolute;
      top: 85px;
      left: -375px;

      @media (max-width: 1300px) {
        top: 100px;
        left: -248px;
        width: 227px;
        height: 158px;
      }

      @media (max-width: 725px) {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
      }
    }

    &-ps {
      display: flex;
      align-items: center;

      @media (max-width: 725px) {
        justify-content: center;
      }

      &__text {
        margin-left: 5px;

        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        text-decoration: underline;
        color: #1C1C1C;

        @media (max-width: 725px) {
          font-size: 12px;
          line-height: 14px;
        }
      }

      & svg {
        @media (max-width: 725px) {
          width: 43px;
          height: 43px;
        }
      }
    }
  }

  //&__text-paragraph {
  //  margin-bottom: 30px;
  //}
}
</style>
