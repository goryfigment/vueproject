<template>
  <button v-on:click="showWalletPopup = true">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    {{ $store.state.truncatedWalletAddress }}
  </button>
</template>

<script lang="ts">
export default {
  methods: {
    emitHideWalletPopup(): void {
      this.$emit('hideWalletPopup')
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-self: center;
  justify-items: center;

  .popup {
    background: #fff;
    padding: 32px;
  }
}
</style>