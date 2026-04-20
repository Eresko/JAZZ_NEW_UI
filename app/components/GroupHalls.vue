<template>
  <section class="group-halls">
    <slot />
  </section>
</template>
<style lang="scss">
.group-halls {
  position: relative;

  display: flex;

  @media (max-width: 725px) {
    flex-direction: column;
  }
}
</style>
