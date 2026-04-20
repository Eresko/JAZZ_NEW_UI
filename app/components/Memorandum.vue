<template>
  <section class="memorandum">
    <div class="container">
      <h1 class="memorandum__title">Меморандум</h1>

      <div class="memorandum__text">
        <p class="memorandum__text-paragraph">
          <b>Меморандум</b> - это ограничения, наложенные компанией дистрибьютером. <br> На фильмы с меморандумом не действуют скидки и пригласительные определенный период времени.
        </p>

        <p class="memorandum__text-paragraph">
          Узнать на какие фильмы и на какой период действуют ограничения можно в подробном описании фильма.
        </p>
      </div>
    </div>

    <picture class="memorandum__image">
      <source media="(max-width: 725px)" srcset="../assets/images/memorandum_mobile44.png" />
      <img src="../assets/images/memorandum_img3.png" alt="Меморандум">
    </picture>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.memorandum {
  padding-top: 42px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;

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
    max-width: 170px;
    font-family: "NEXT ART";
    font-weight: 600;
    font-size: 26px;
    line-height: 28px;
    color: #FFFFFF;
    text-transform: uppercase;
    text-align: left;

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
      //top: 166px;
      top:130px;

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

  &__text {
    width: 74%;
    padding: 46px 20px 0 91px;
    margin-bottom: 30px;

    text-align: left;

    font-family: "Montserrat";
    font-weight: 500;
    font-size: 15px;
    line-height: 30px;
    color: #1C1C1C;

    @media (max-width: 1300px) {
      padding: 9px 0 0 61px;
    }

    @media (max-width: 725px) {
      margin-bottom: 25px;
      padding: 19px 0 0;
      width: 100%;
      font-size: 12px;
      line-height: 25px;
    }

    &-paragraph:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  & img {
    box-shadow: 4px 4px 12px 0px #98E6FF33;
    margin-left: -18%;

    @media (max-width: 1440px) {
      margin-left: -10%;
    }

    @media (max-width: 1300px) {
      margin-left: -6%;
    }

    @media (max-width: 1000px) {
      margin-left: 8%;
      width: 659px;
    }

    @media (max-width: 725px) {
      margin-left: 0;
      margin-bottom: 38px;
      width: 100%;
      //box-shadow: none;
      border: 1px solid #8B8B8B;
    }
  }
}
</style>
