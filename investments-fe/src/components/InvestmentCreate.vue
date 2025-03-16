<template>
    <div class="container-fluid">
      <div class="row align-items-center justify-content-center">
        <div class=" col align-items-center">
          <div class="row align-items-center justify-content-center">
            <div class="col col-12 col-sm-10 col-md-10 col-lg-6">
              <div class="alert alert-danger shadow" role="alert"
              v-if="showMsg === 'error'">
                Please verify Investment Information
              </div>
            </div>
          </div>
          <div class="row align-items-center justify-content-center">
            <div class="col col-12 col-sm-10 col-md-10 col-lg-6 align-items-center">
              <div class="card">
                <div class="card-header">{{pageTitle}}</div>
                <div class="card-body">
                  <form ref="form">
                    <div class="container-fluid">
                      <div class=" row justify-content-around py-2">
                        <label class="col-4">Customer</label>
                        <div class="col col-8">
                          <select v-model="investment.customer" class="form-select">
                            <option class ="form-select form-select-sm " v-for=" item in list" :value="item.pk" :key="item.pk"> {{item.name}} </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row justify-content-around py-2">
                        <label class="col-4">Category</label>
                        <div class="col col-8">
                          <input v-model="investment.category" type="text" class="form-control-sm form-control">
                        </div>
                      </div>          
                      <div class="form-group row justify-content-around py-2">
                        <label class="col-4">Description</label>
                        <div class="col col-8">
                          <input v-model="investment.description" type="text" class="form-control-sm form-control">
                        </div>
                      </div> 
                      <div class="form-group row justify-content-around py-2">
                        <label class="col-4">Acquired Value</label>
                        <div class="col col-8">
                          <input v-model="investment.acquired_value" type="number" class="form-control-sm form-control">
                        </div>
                      </div>   
                      <div class="form-group row justify-content-around py-2">
                        <label class="col-4">Acquired Date</label>
                        <div class="col col-8">
                          <input v-model="investment.acquired_date" type="date" class="form-control-sm form-control">
                        </div>
                      </div>
                      <div class="form-group row justify-content-around py-2">
                        <label class="col-4">Recent Value</label>
                        <div class="col col-8">
                          <input v-model="investment.recent_value" type="number" class="form-control-sm form-control">
                        </div>
                      </div>
                       <div class="form-group row justify-content-around py-2">
                        <label class="col-4">Recent Date</label>
                        <div class="col col-8">
                          <input v-model="investment.recent_date" type="date" class="form-control-sm form-control">
                        </div>
                      </div>
                      <div class="row justify-content-around">
                        <div v-if="!isUpdate" type="button" class="btn btn-primary col-4" @click="createInvestment">Save</div>
                        <div v-if="isUpdate" type="button" class="btn btn-primary col-4" @click="updateInvestment">Update</div>
                        <div type="button" class="btn btn-secondary col-4" @click="cancelOperation">Cancel</div>   
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import router from '../router';
    import {APIService} from '../http/APIService';
    const apiService = new APIService();
   
    export default {
      name: 'InvestmentCreate',
      components: {},
                //prevent user from accessing this page if not authorized
    beforeCreate() {
    if (localStorage.getItem("isAuthenticated") &&
        JSON.parse(localStorage.getItem("isAuthenticated")) === true ){
          this.authenticated = true
        }
        else {
          this.authenticated = false
        }
        if(this.authenticated===false){
            router.push("/auth");
          }
     },
      data() {
        return {
          customers: [],
          showError: false,
          investment: {},
          pageTitle: "Add New Investment",
          isUpdate: false,
          showMsg: '',
          date: new Date(),
          authenticated: false
        };
      },
      computed:{
        list:{
        get () {
              return this.customers
          },
            set (newValue) {
              this.customers = newValue
            }
        }
      },
      methods: {
        getCustomers() {
          apiService.getCustomerList().then(response => {
            this.customers = response.data.data;
            if (localStorage.getItem("isAuthenticated")
              && JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
              this.validUserName = JSON.parse(localStorage.getItem("log_user"));
            }
          }).catch(error => {
            if (error.response.status === 401) {
              localStorage.clear();
              router.push("/auth");
            }
          });
        },
        createInvestment() {
          apiService.addNewInvestment(this.investment).then(response => {
            if (response.status === 201) {
              this.investment = response.data;
               this.showMsg = "";
              router.push('/investment-list/new');
            }else{
                this.showMsg = "error";
            }
          }).catch(error => {
            if (error.response.status === 401) {
              router.push("/auth");
            }else if (error.response.status === 400) {
              this.showMsg = "error";
            }
          });
        },
        cancelOperation(){
           router.push("/investment-list");
        },
        updateInvestment() {
          apiService.updateInvestment(this.investment).then(response => {
            if (response.status === 200) {
              this.investment = response.data;
              router.push('/investment-list/update');
            }else{
                this.showMsg = "error";
            }
          }).catch(error => {
            if (error.response.status === 401) {
              router.push("/auth");
            }else if (error.response.status === 400) {
              this.showMsg = "error";
            }
          });
        }
      },
      mounted() {
        this.getCustomers();
        if (this.$route.params.pk) {
          this.pageTitle = "Edit Investment";
          this.isUpdate = true;
          apiService.getInvestment(this.$route.params.pk).then(response => {
            this.investment = response.data;
          }).catch(error => {
            if (error.response.status === 401) {
              router.push("/auth");
            }
          });
        }
      },
    }
  </script>
  
  <style scoped>
    .aform {
      margin-left: auto;
      width: 60%;
    }
  </style>
  