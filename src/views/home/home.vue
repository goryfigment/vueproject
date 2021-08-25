<template>
  <div id="grid">
    <section>
      <h2>Total Value Locked</h2>
      <div>
        <b>Gator to Harvest</b>
        <div>15353.983</div>
      </div>
      <div>
        <b>Gator in Wallet</b>
        <div>10223.983</div>
      </div>
    </section>
    <section>
      <h2>Total Value Locked</h2>
      <div>
        <b>Gator to Harvest</b>
        <div>15353.983</div>
        <button @click="deploy()">Harvest All (2)</button>
      </div>
    </section>
    <section>
      <h2>Total Value Locked</h2>
      <div>
        <b>Gator in Wallet</b>
        <div>10223.983</div>
      </div>
    </section>

    <button @click="transaction()">transaction</button>
    <button @click="getContract()">get</button>
  </div>
</template>

<script lang="ts">
import { deploy, transaction, getContract } from '@/utility/ContactUtil'

export default {
  name: 'Home',
  methods: {
    deploy: (): void => {
      deploy()
    },
    transaction: (): void => {
      transaction()
    },
    getContract: (): void => {
      getContract()
    },
  },
}
</script>

<style lang="scss">
#grid {
  margin-top: 18px;
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 1200px;
}

h2 {
  color: rgb(106 49 255);
  font-weight: 500;
  margin: 10px 0;
  font-size: 20px;
}

section:first-child {
  grid-area: 1 / 1 / 3 / 3;
}

section:nth-child(2) {
  grid-area: 1 / 3 / 2 / 5;
}

section:nth-child(3) {
  grid-area: 2 / 3 / 3 / 5;
}

section {
  padding: 40px 50px;
  border-radius: 5px;
  background-image: linear-gradient(to right, rgba(34, 59, 231, 0.09), rgba(52, 67, 249, 0.15));
}

#main-panel {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px;
  overflow-y: auto;
  background: #150a33;
}
</style>
