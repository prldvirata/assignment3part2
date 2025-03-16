<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col col-12 align-items-center justify-content-center">
                <blockquote>
                    &#8220;Welcome {{validUserName}}!&#8221;
                    <footer>
                    <small>
                        <em>&mdash;Financial Services, your Midwest Financial Services Partner.</em>
                    </small>
                    </footer>
                </blockquote>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row align-items-center justify-content-center">
            <div class="col col-12 col-sm-10 col-md-10">
                <div class="card-group">
                <div class="card">
                  <img :src="require('@/assets/customer.jpg')" class="card-img-top" style="height: 15rem">
                  <div class="card-body">
                    <h5 class="card-title">Customers</h5>
                    <a @click="viewCustomers" class="btn btn-primary">Show Customers</a>
                  </div>
                </div>
                <div class="card">
                  <img :src="require('@/assets/nonstock.jpg')" class="card-img-top" style="height: 15rem">
                  <div class="card-body">
                    <h5 class="card-title">Investments</h5>
                    <a @click="viewInvestments" class="btn btn-primary">Show Investments</a>
                  </div>
                </div>
                <div class="card">
                  <img :src="require('@/assets/stocks.jpg')" class="card-img-top" style="height: 15rem">
                  <div class="card-body">
                    <h5 class="card-title">Stocks</h5>
                    <a @click="viewStocks" class="btn btn-primary">Show Stocks</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from '../router'
export default {
    name: 'Home',
    beforeCreate() {
    if (localStorage.getItem("isAuthenticated") &&
        JSON.parse(localStorage.getItem("isAuthenticated")) === true ){
          this.authenticated = true
        }
        else {
          this.authenticated = false
        }
   },
    data: () => ({
      validUserName: "Guest",
      authenticated: false
    }),
    mounted() {
        if (localStorage.getItem("isAuthenticated")
          && JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          this.authenticated = true;
        }
    },
    methods: {
      viewCustomers() {
        router.push('/customer-list');
      },
      viewInvestments() {
        router.push('/investment-list');
      },
      viewStocks() {
        router.push('/stock-list');
      },
    }
  }
</script>
