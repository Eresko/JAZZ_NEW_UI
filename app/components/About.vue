<template>
  <section class="about">
    <div class="container">
      <h1 class="about__title">О кинотеатре</h1>

      <div class="about__info">
        <div class="about__text">
          <p class="about__text-paragraph">
            Jazz Cinema – уютный кинотеатр в г. Магнитогорске. Он работает в торговом центре «Jazz Mall» с 2007 года.
            Для посетителей открыто 6 кинозалов на 1126 мест. Вместимость залов от 50 до 300 зрителей.
            Каждый зал оформлен в современном стиле, располагающем к комфортному отдыху. Ряды кресел Destro SPA расположены на значительном расстоянии друг от друга, что позволяет зрителям устроиться максимально удобно. Широкоформатные экраны делают изображение ярким и четким.
          </p>
          <img :src="require(`../assets/images/photo_2023-11-09_16-08-24.jpg`)" width="331" height="230"class="about__text-img">

        </div>

        <div class="about__text">
          <p class="about__text-paragraph">
            Каждый зал оснащен современной системой звуковоспроизведения Dolby Digital Surround EX, создающей объемное и реалистичное звучание. Залы оборудованы мягкими креслами.
            Каждую неделю мы подбираем такую программу, которая заинтересует большинство. Jazz Cinema предлагает не просто кино, но и события — тематические показы с лекторами, конференции, событийные мероприятия городского уровня.
            Помимо актуальных новинок и популярных кассовых фильмов здесь транслируется авангардное кино для настоящих ценителей киноискусства.
          </p>
          <img :src="require(`../assets/images/photo_2023-11-09_16-08-29.jpg`)" width="331" height="230"class="about__text-img">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.about {
  padding-top: 85px;

  @media (max-width: 1300px) {
    padding-top: 62px;
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
      line-height: 19.5px;
      font-weight: 700;
      text-align: center;
      text-transform: none;
      color: #01BDF9;
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
        //width: 19%;
        width: 147px;
        top: 134px;
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

    &:nth-child(2) {
      @media (max-width: 725px) {
        margin-top: 30px;
      }
    }

    &-paragraph {
      min-height: 210px;

      @media (max-width: 725px) {
        margin-bottom: 17px;
      }
    }

    &-img {
      position: absolute;
      top: 85px;
      left: -375px;
      display: block;
      width: 331px;
      height: 230px;

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

    @media (min-width: 1800px) {
      max-width: 1010px;
    }
  }

  &__text:not(:last-child) {
    @media (min-width: 1300px) {
      margin-bottom: 60px;
    }

    @media (max-width: 880px) {
      margin-bottom: 0;
    }
  }

  //&__text-paragraph {
  //  margin-bottom: 30px;
  //}
}
</style>