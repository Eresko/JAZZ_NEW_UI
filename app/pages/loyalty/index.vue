<template>
  <div>
    <Main>
      <Loyalty />
      <BackLink class="loyaltyBackLink"/>
    </Main>
  </div>
</template>

<style lang="scss">
.loyaltyBackLink {
  @media (max-width: 725px) {
    display: none!important;
  }
}
</style>
