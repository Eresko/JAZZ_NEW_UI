<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
import { useModalStore } from '@/store/modals'
const showMobileMenu = ref()
const autorizationStore = useAutorizationStore()
const modalStore = useModalStore()
onMounted( () => {
  autorizationStore.initToken()
})
const toggleMenu = (closeMenu = false) => {
  if (closeMenu) {
    showMobileMenu.value = false;
  } else {
    showMobileMenu.value = !showMobileMenu.value;
  }
}

</script>


<template>
  <header class="header">
    <HeaderLeft />
    <section class="header__right">
      <HeaderCarousel />
      <HeaderMenuMobile v-show="modalStore.mobileMenu" />
      <HeaderMenu @showMobileMenu="showMobileMenu = true" v-show="!showMobileMenu"/>

    </section>
  </header>
</template>


<style lang="scss">
.header {
  display: flex;

  &__right {
    position: relative;
    width: 70.3%;

    //overflow: hidden;
  }
}

@media (max-width: 1300px) {
  .header {
    &__right {
      width: calc(100% - 27.2%);
      //height: 460px;
      height: 530px;
    }
  }
}
@media (max-width: 725px) {
  .header {
    &__right {
      width: 100vw;
      height: 100vh;
    }
  }
}
</style>
