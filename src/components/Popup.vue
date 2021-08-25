<template>
  <div id="overlay" @click.stop="TogglePopup()">
    <div id="popup" @click.stop>
      <button class="close-popup" @click.stop="TogglePopup()"><XIcon /></button>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { XIcon } from '@heroicons/vue/solid'
export default {
  props: ['TogglePopup'],
  components: { XIcon },
}
</script>

<style lang="scss">
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  #popup {
    background: rgb(18, 12, 35);
    padding: 35px 40px;
    position: relative;
    // border: #1a1436 1px solid;
    font-size: 20px;

    &:after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      height: calc(100% + 4px);
      width: calc(100% + 4px);
      background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
      border-radius: 0;
      z-index: -1;
      animation: animatedgradient 20s ease alternate infinite;
      background-size: 300% 300%;
    }
  }

  .close-popup {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 12px;
    border: none;
    margin: 0;
    transition: 0.2s ease all;

    svg {
      height: 16px;
      width: 16px;
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover {
      svg {
        color: #ffffff;
      }
    }
  }

  .popup-btn-wrapper {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 0 0 10px;
      .external-link-icon {
        height: 16px;
        margin: 0 0 -4px 2px;
      }
    }
  }
}

.wallet-wrapper {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  margin: 20px 0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  .copy-wallet-btn {
    height: 44px;
    svg {
      height: 20px;
      margin-left: 10px;
      padding: 10px;
    }
  }
  .solid-clipboard {
    display: none;
  }
  &:hover {
    .outline-clipboard {
      display: none;
    }
    .solid-clipboard {
      display: block;
    }
  }
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
