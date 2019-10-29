<template>
  <main class="home-content">
    <div class="loading"></div>
    <div class="home-content__wrapper">
      <h1 class="home-content__header">Trades</h1>
      <div class="underline"></div>
      <div class="home-content__body">
        <article class="home-content__card" v-for="(trade, index) in trades" :key="index">
          <img :src="require('@/assets/42257164_xl.jpg')" alt srcset class="trade-image" />
          <div class="home-content__card-details">
            <h3 class="home-content__card-name">{{trade.name}}</h3>
            <address>{{trade.address}}, {{trade.city}}. {{trade.postcode}}</address>
            <div class="email">
              Email:
              <a :href="`mailto:${ trade.email}`">{{trade.email}}</a>
            </div>
            <ul class="open-hours">
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
            </ul>
            <span class="status open-status" v-if="trade.is_active = true">OPEN</span>
            <span class="status close-status" v-else>CLOSE</span>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Trades",
  data() {
    return {
      trades: [],
      isLoading: true,
      isOpen: false,
      openDays: []
    };
  },
  mounted: async function() {
    this.getTrades();
  },
  methods: {
    async getTrades() {
      await axios
        .get("https://wrenew-backend.herokuapp.com/api/trades")
        .then(response => {
          console.log(response);
          this.trades = response.data.trades;
          this.openDays = response.data.trades.hours;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getStatus() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-content {
  width: 100%;
  display: flex;
  justify-content: center;
  &__wrapper {
    width: 100%;
    padding: 0 2rem;
    display: block;
    .underline {
      margin: 0 auto;
      background: #000;
      width: 7rem;
      height: 0.3rem;
    }
  }
  &__header {
    margin: 0;
    text-align: center;
  }
  &__body {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: center; */

    a {
      color: #2c3e50;
      text-decoration: none;
      &:visited {
        color: #2c3e50;
      }
    }
  }
  &__card {
    width: 30%;
    border: 0.2rem #000 solid;

    margin: 2rem 0.5rem 0 0.5rem;
    .trade-image {
      width: 100%;
      height: auto;
    }
    &-details {
      padding: 0 0.5em 0.5em 0.5rem;
      .email {
        margin-top: 0.3rem;
      }
      .open-hours {
        list-style-type: none;
        display: flex;
        padding: 0;
        li {
          margin: 0 0.5rem;
          padding: 0.5em;
          border: 0.2rem #000 solid;
        }
      }
      .status {
        width: 3rem;
        padding: 0.2em;
        color: #fff;
      }
      .open-status {
        background: green;
      }
      .close-status {
        background: red;
      }
    }
  }
}
</style>