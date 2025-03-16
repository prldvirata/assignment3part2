<template>
  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col align-items-center">
        <div class="row align-items-center justify-content-center">
          <div class="col col-12 col-sm-10 col-md-10 col-lg-6">
            <div class="alert alert-danger shadow" role="alert" v-if="showMsg === 'error'">
              Please verify Stock Information
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col col-12 col-sm-10 col-md-10 col-lg-6 align-items-center">
            <div class="card">
              <div class="card-header">{{ pageTitle }}</div>
              <div class="card-body">
                <form ref="form">
                  <div class="container-fluid">
                    <div class="row justify-content-around py-2">
                      <label class="col-4">Customer</label>
                      <div class="col col-8">
                        <select v-model="stock.customer" class="form-select">
                          <option class="form-select form-select-sm" v-for="item in list" :value="item.pk" :key="item.pk">{{ item.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Symbol</label>
                      <div class="col col-8">
                        <input v-model="stock.symbol" type="text" class="form-control-sm form-control">
                      </div>
                    </div>
                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Name</label>
                      <div class="col col-8">
                        <input v-model="stock.name" type="text" class="form-control-sm form-control">
                      </div>
                    </div>
                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Shares</label>
                      <div class="col col-8">
                        <input v-model="stock.shares" type="number" class="form-control-sm form-control">
                      </div>
                    </div>
                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Purchase Price</label>
                      <div class="col col-8">
                        <input v-model="stock.purchase_price" type="number" class="form-control-sm form-control">
                      </div>
                    </div>
                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Purchase Date</label>
                      <div class="col col-8">
                        <input v-model="stock.purchase_date" type="date" class="form-control-sm form-control">
                      </div>
                    </div>
                    <div class="row justify-content-around">
                      <div v-if="!isUpdate" type="button" class="btn btn-primary col-4" @click="createStock">Save</div>
                      <div v-if="isUpdate" type="button" class="btn btn-primary col-4" @click="updateStock">Update</div>
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
import { APIService } from '../http/APIService';
const apiService = new APIService();

export default {
  name: 'StockCreate',
  beforeCreate() {
    if (!localStorage.getItem("isAuthenticated") || JSON.parse(localStorage.getItem("isAuthenticated")) !== true) {
      router.push("/auth");
    }
  },
  data() {
    return {
      customers: [],
      showError: false,
      stock: {},
      pageTitle: "Add New Stock",
      isUpdate: false,
      showMsg: '',
      authenticated: false
    };
  },
  computed: {
    list: {
      get() {
        return this.customers;
      },
      set(newValue) {
        this.customers = newValue;
      }
    }
  },
  methods: {
    getCustomers() {
      apiService.getCustomerList().then(response => {
        this.customers = response.data.data;
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.clear();
          router.push("/auth");
        }
      });
    },
    createStock() {
      apiService.addNewStock(this.stock).then(response => {
        if (response.status === 201) {
          this.stock = response.data;
          this.showMsg = "";
          router.push('/stock-list/new');
        } else {
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        } else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    },
    cancelOperation() {
      router.push("/stock-list");
    },
    updateStock() {
      apiService.updateStock(this.stock).then(response => {
        if (response.status === 200) {
          this.stock = response.data;
          router.push('/stock-list/update');
        } else {
          this.showMsg = "error";
        }
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        } else if (error.response.status === 400) {
          this.showMsg = "error";
        }
      });
    }
  },
  mounted() {
    this.getCustomers();
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Stock";
      this.isUpdate = true;
      apiService.getStock(this.$route.params.pk).then(response => {
        this.stock = response.data;
      }).catch(error => {
        if (error.response.status === 401) {
          router.push("/auth");
        }
      });
    }
  }
};
</script>

<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>