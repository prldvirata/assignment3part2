<template>
  <ul class="nav justify-content-end">
      <div class="FS">Financial Services</div>
      <li class="nav-item active">
          <router-link to="/">Home</router-link> |
      </li>
      <li class="nav-item">
          <router-link :to="{name: 'CustomerList'}">Customers</router-link> |
      </li>
      <li class="nav-item">
              <router-link :to="{name: 'InvestmentList'}">Investments</router-link> | 
      </li>
      <li class="nav-item">
              <router-link :to="{name: 'StockList'}">Stocks</router-link> | 
        </li>

      <li class="nav-item">
              <router-link :to="{name: 'MyCustomerList'}">My Customers</router-link> | 
      </li>

      <li class="nav-item" v-if="!authenticated" @click="register" >
          <router-link :to="{name: 'Register'}">Register</router-link> |
      </li>
      <li class="nav-item" v-if="!authenticated" @click="login" >
          <router-link :to="{name: 'Auth'}">Log in</router-link>
      </li>
      <li class="nav-item  .justify-content-end" v-if="authenticated" @click="logout" >
          <router-link :to="{name: 'Auth'}">Logout</router-link>
      </li>
  </ul>
  <router-view/>
</template>
<script>
  import router from './router';
  import {APIService} from './http/APIService';
import { jsx } from 'vue/jsx-runtime';
  const apiService = new APIService();

  export default {
      name: 'App',
      data: () => ({
          authenticated: false,
          dialog: false
      }),
      
      mounted() {
        if (localStorage.getItem("isAuthenticated") &&
            JSON.parse(localStorage.getItem("isAuthenticated")) === true ){
            this.authenticated = true;
        }else {
            this.authenticated = false;
        }
      },
      methods: {
          logout() {
            //clear local storage items and set authenticated to false
            localStorage.clear();
            localStorage.setItem("isAuthenticated", false);
            localStorage.setItem("username", "Guest");
            this.authenticated = false;
            window.location = "/";
          },
          login() {
              router.push("/auth");
          },
          home() {
            window.location = "/";
            },
        register() {
            router.push("/register");
        }
      }
  }
</script>
<style lang="scss">
  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
  }
  #nav {
      padding: 30px;
      background-color: cadetblue;
      a {
          font-weight: bold;
          color: #2c3e50;
          &.router-link-exact-active {
              color: #42b983;
          }
      }
  }
  .nav {
      padding: 1em;
      background-color: cadetblue;
      
      li {
          font-weight: bold;
          color: #2c3e50;
      }
      a {
          color: black;
          padding: .5em;

          &.router-link-exact-active {
              color: #42b983;
          }
      }
      .FS{
          margin-right: 33em;
      }
  }
</style>
