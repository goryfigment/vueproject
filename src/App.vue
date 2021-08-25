<template>
  <header>
    <router-link to="/">
      <img alt="Lava Lamp Logo" src="./assets/images/gatorlogo.png" />
      <h1>GatorSwap</h1>
    </router-link>

    <button v-if="!$store.state.isVerified" @click="activateWallet()">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      Connect
    </button>
    <button v-else @click="() => TogglePopup('walletPopup')">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      {{ $store.state.truncatedWalletAddress }}
    </button>
  </header>

  <div id="body-wrapper">
    <div id="left-panel">
      <div v-bind:class="{ active: $route.name === 'Home' }">
        <a><HomeIcon /> Home</a>
      </div>
      <div>
        <a><SwitchHorizontalIcon /> Trade</a>
      </div>
      <div v-bind:class="{ active: $route.name === 'Farm' }">
        <a><GlobeIcon /> Farms</a>
      </div>
      <div v-bind:class="{ active: $route.name === 'Pools' }">
        <a><MoonIcon /> Pools</a>
      </div>
      <div v-bind:class="{ active: $route.name === 'Referal' }">
        <a><UserGroupIcon /> Referal</a>
      </div>
      <div v-bind:class="{ active: $route.name === 'Info' }">
        <a><PresentationChartLineIcon /> Info & Audit</a>
      </div>
    </div>
    <notifications id="wallet-notification" group="wallet" />
    <div id="main-panel">
      <router-view />
    </div>
  </div>

  <popup v-if="popupTriggers.walletPopup" :TogglePopup="() => TogglePopup('walletPopup')">
    <notifications id="popup-notification" group="popup" position="top center" width="160" />
    <div class="popup-title">Account</div>
    <div class="wallet-wrapper" @click="copyToClipboard($store.state.walletAddress)">
      {{ $store.state.walletAddress }}
      <div class="copy-wallet-btn">
        <ClipboardIcon class="outline-clipboard" />
        <SolidClipboardIcon class="solid-clipboard" />
      </div>
    </div>
    <div class="popup-btn-wrapper">
      <button @click="redirectToExplorer($store.state.walletAddress)">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        Explorer <ExternalLinkIcon class="external-link-icon" />
      </button>
      <button class="negative" @click="TogglePopup('walletPopup'), disconnectWallet()">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        Disconnect
      </button>
    </div>
  </popup>
</template>

<script lang="ts">
import {
  HomeIcon,
  SwitchHorizontalIcon,
  GlobeIcon,
  MoonIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  ClipboardIcon as SolidClipboardIcon,
} from '@heroicons/vue/solid'
import { ClipboardIcon, ExternalLinkIcon } from '@heroicons/vue/outline'
import { activateWallet, disconnectWallet, redirectToExplorer } from '@/utility/WalletAuth'
import { copyToClipboard } from '@/utility/GeneralHelpers'
import $store from './store'
import Popup from './components/Popup.vue'
import { ref } from 'vue'

export default {
  props: {
    name: String,
  },
  components: {
    HomeIcon,
    SwitchHorizontalIcon,
    GlobeIcon,
    MoonIcon,
    UserGroupIcon,
    PresentationChartLineIcon,
    ClipboardIcon,
    SolidClipboardIcon,
    ExternalLinkIcon,
    Popup,
  },
  data(): {
    isVerified: boolean
    walletAddress: string
    truncatedWalletAddress: string
  } {
    return {
      isVerified: false,
      walletAddress: '',
      truncatedWalletAddress: 'Connect',
    }
  },
  setup(): any {
    const popupTriggers = ref({
      walletPopup: false,
    })

    const TogglePopup = (trigger: any, option: string) => {
      function localTrigger() {
        popupTriggers.value[trigger] = !popupTriggers.value[trigger]
      }
      if (trigger == 'walletPopup' && $store.getters.getIsVerified) {
        localTrigger()
      } else if (trigger != 'walletPopup') {
        localTrigger()
      } else if (option == 'forceClose') {
        localTrigger()
      }
    }

    return {
      popupTriggers,
      TogglePopup,
    }
  },
  mounted(): void {
    this.isVerified = $store.getters.getIsVerified
    this.walletAddress = $store.getters.getWalletAddress
    this.truncatedWalletAddress = $store.getters.getTruncatedWalletAddress
  },
  methods: {
    activateWallet: (): void => {
      activateWallet()
    },
    disconnectWallet: (): void => {
      disconnectWallet()
    },
    redirectToExplorer: (address: string): void => {
      redirectToExplorer(address)
    },
    copyToClipboard(address: string): void {
      copyToClipboard(address)
    },
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Rubik';
  src: local('Rubik'), url('./assets/fonts/Rubik-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: 'Rubik';
  src: local('Rubik'), url('./assets/fonts/Rubik-Regular.ttf') format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: 'Rubik';
  src: local('Rubik'), url('./assets/fonts/Rubik-Medium.ttf') format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: 'Rubik';
  src: local('Rubik'), url('./assets/fonts/Rubik-Bold.ttf') format('truetype');
  font-weight: bold;
}

$line-size: 2px;
$delay1: 0.5s;
$delay2: 0.9s;
$distance: -2px;

body {
  margin: 0;
  background: #120a27;
  min-height: 100vh;
  max-width: 100vw;
  font-size: 25px;
  font-family: 'Rubik', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Roboto Slab';
  color: rgba(255, 255, 255, 0.87);
}

button {
  margin: 0 32px 0 auto;
  background: transparent;
  outline: none;
  color: white;
  font-weight: bold;
  padding: 10px 30px;
  cursor: pointer;
  border: solid rgba(255, 255, 255, 0.3) 2px;
  position: relative;

  .line {
    background: white;
    position: absolute;
    transition: none;
    transform: scale(0);
    opacity: 1;
  }
  .line:nth-child(1) {
    transform-origin: 100% 100%;
    height: $line-size;
    width: 20%;
    bottom: $distance;
    left: 0;
  }
  .line:nth-child(4) {
    transform-origin: 0 100%;
    height: $line-size;
    width: 20%;
    top: $distance;
    right: 0;
  }
  .line:nth-child(2) {
    transform-origin: 100% 100%;
    height: 100%;
    width: $line-size;
    bottom: 0;
    left: $distance;
  }
  .line:nth-child(5) {
    transform-origin: 100% 0;
    height: 100%;
    width: $line-size;
    bottom: 0;
    right: $distance;
  }
  .line:nth-child(3) {
    transform-origin: 0 100%;
    height: $line-size;
    width: 100%;
    top: $distance;
    left: $distance;
  }
  .line:nth-child(6) {
    transform-origin: 100% 0;
    height: $line-size;
    width: 100%;
    bottom: $distance;
    right: $distance;
  }
  &:hover > .line {
    transform: scale(1);
    opacity: 0;
    transition: all 1s;
  }
  &:hover > .line:nth-child(2),
  &:hover > .line:nth-child(5) {
    transition-delay: $delay1;
  }
  &:hover > .line:nth-child(3),
  &:hover > .line:nth-child(6) {
    transition-delay: $delay2;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
}

button.negative {
  border: solid rgba(255, 102, 102, 0.3) 2px;
  .line {
    background: rgba(255, 102, 102, 0.6);
  }
}

#wallet-notification {
  position: absolute;
  top: 20px !important;
  right: 20px !important;
}

#popup-notification {
  position: absolute;
  top: 7px !important;
  text-align: center;
}

.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 15px;
  color: #ffffff;
  // default (blue)
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  .notification-title {
    font-size: 17px;
    margin-bottom: 8px;
  }

  // types (green, amber, red)
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}

header {
  display: flex;
  align-items: center;
  line-height: 19px;
  font-weight: bold;
  img {
    height: 40px;
    margin-right: 16px;
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    padding: 20px;
    h1 {
      font-size: 20px;
      font-weight: 600;
    }
  }
}

#body-wrapper {
  display: flex;
  position: relative;
  min-height: calc(100vh - 86px);
  min-width: 100vw;
}

#left-panel {
  padding: 30px 0;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgb(32 25 68);
  div {
    border-left: 3px solid transparent;
    cursor: pointer;
    padding: 15px 20px;
    width: 175px;
    a {
      display: flex;
      align-items: center;
    }
    svg {
      height: 25px;
      width: 25px;
      margin-right: 8px;
    }
    &:hover {
      border-left: 3px solid #ffffff;
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
    }
  }
  div.active {
    font-weight: 300;
    border-left: 3px solid #ffffff;
    text-shadow: 0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff;
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
}
</style>
