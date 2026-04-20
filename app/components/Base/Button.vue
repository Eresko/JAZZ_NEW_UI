<script setup lang="ts">
import { defineEmits, } from 'vue'
const emit = defineEmits(['onClick'])
const onClick = () => {
  emit('onClick')
}



</script>
<template>
  <button class="baseButton" @click="onClick">
    <slot />
  </button>
</template>


<style lang="scss" scoped>
.baseButton {
  border: 1px solid #FFFFFF;
  border-radius: 50px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  max-width: 260px;
  cursor: pointer;
  &:hover {
    border: 1px solid #01bdf9;
    filter: drop-shadow(0px 0px 4px #01bdf9);
    color: #01bdf9;
    text-shadow: 0px 0px 4px #01bdf9;
  }
}
</style>
