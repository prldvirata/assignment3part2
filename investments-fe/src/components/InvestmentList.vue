<template>
    <div class="container-fluid">
        <div class="row align-items-center justify-content-center">
            <div class="col col-12 align-items-center justify-content-center">
                <blockquote>
                    Welcome {{ validUserName }}!
                    <footer>
                        <small>
                            <em>&mdash;Financial Services, your Midwest Financial Services Partner.</em>
                        </small>
                    </footer>
                </blockquote>
            </div>
            <div class="col-12 col-md-10 col-lg-10 col-12 align-items-center justify-content-center">
                <div class="alert alert-success"
                     v-if="showMsg === 'new'"
                     :value="true">
                    New Investment has been added.
                </div>
                <div class="alert alert-success"
                     v-if="showMsg === 'update'"
                     :value="true">
                    Investment information has been updated.
                </div>
                <div class="alert alert-success"
                     v-if="showMsg === 'deleted'"
                     :value="true">
                    Selected investment has been deleted.
                </div>
            </div>
        </div>
        <!--Mobile device view-->
               <div class="d-md-none" id="collapsable-card" style="width: 80%">
                <button type="button" class="btn btn-primary" @click="addNewInvestment">
                    <font-awesome-icon icon="plus"/>
                </button>
                <div class="card" v-for="investment in investments" v-bind:key="investment">
                    <div class="card-header" :id="'heading' + investment.name">
                        <button class="btn btn-link collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse' + investment.pk" 
                        aria-expanded="true" :aria-controls="'collapse' + investment.pk">
                            <h6 style="color: #0275d8; float: left">{{investment.category}}</h6>
                        </button>
                    </div>

                    <div :id="'collapse' + investment.pk" class="collapse" :aria-labelledby="'heading' + investment.pk" 
                    data-bs-parent="#collapsable-card">
                        <div class="card-body">
                            <p><b>Customer:</b> {{investment.customer}}</p>
                            <p><b>Category:</b> {{investment.category}}</p>
                            <p><b>Description:</b> {{investment.description}}</p>
                            <p><b>Acquired Date:</b> {{investment.acquired_date}}</p>
                            <p><b>Acquired Value:</b> {{investment.acquired_value}}</p>
                            <p><b>Recent Date:</b> {{investment.recent_date}}</p>
                            <p><b>Recent Value:</b> {{investment.recent_value}}</p>
                            <div class="btn-group">
                                <button  @click="updateInvestment(investment)" style="background-color: transparent; padding: 5;">
                                    <font-awesome-icon icon="pencil"/></button>
                                <button @click="deleteInvestment(investment)" style="background-color: transparent; padding: 5;">
                                    <font-awesome-icon icon="trash"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--non-Mobile device view-->
            <div class="col col-12 col-md-10 d-none d-xl-block d-lg-block d-md-block">
                <table class="table table-hover" style="overflow-y: auto"
                       :headers="headers">
                    <thead>
                    <tr>
                        <th scope="col">Customer #</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Acquired Value</th>
                        <th scope="col">Acquired Date</th>
                        <th scope="col">Recent Value</th>
                        <th scope="col">Recent Date</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for = "investment in investments" v-bind:key="investment">
                        <th scope="row">{{investment.cust_number}}</th>
                        <td>{{investment.category}}</td>
                        <td>{{investment.description}}</td>
                        <td>${{investment.acquired_value}}</td>
                        <td>{{investment.acquired_date}}</td>
                        <td>${{investment.recent_value}}</td>
                        <td>{{investment.recent_date}}</td>
                        <td @click="updateInvestment(investment)"><button style="background-color: transparent; padding: 0;">
                            <font-awesome-icon icon="pencil"/></button>
                        </td>
                        <td @click="deleteInvestment(investment)"><button style="background-color: transparent; padding: 0;">
                            <font-awesome-icon icon="trash"/></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-primary" @click="addNewInvestment">Add New Investment</button>
            </div>
        </div>
</template>

<script>
import router from '../router';
import {APIService} from '../http/APIService';
    const apiService = new APIService();
    export default {
        name: "InvestmentList",
        data: () => ({
            investments: [],
            validUserName: "Guest",
            investmentSize: 0,
            showMsg: '',
            isMobile: false,
            authenticated: false,
            headers: [
                {text: 'Customer Number', sortable: false, align: 'left',},
                {text: 'Category', sortable: false, align: 'left',},
                {text: 'Description', sortable: false, align: 'left',},
                {text: 'Acquired_Value', sortable: false, align: 'left',},
                {text: 'Acquired_Date', sortable: false, align: 'left',},
                {text: 'Recent_Value', sortable: false, align: 'left',},
                {text: 'Recent_Date', sortable: false, align: 'left',},
                {text: 'Update', sortable: false, align: 'left',},
                {text: 'Delete', sortable: false, align: 'left',}
            ],
        }),
        mounted() {
            this.authenticated = localStorage.getItem("isAuthenticated")
            this.getInvestments();
            this.showMessages();
        },
        methods: {
            onResize() {
                if (window.innerWidth < 600)
                    this.isMobile = true;
                else
                    this.isMobile = false;
            },
            showMessages(){
                if (this.$route.params.msg) {
                    this.showMsg = this.$route.params.msg;
                }
            },
            getInvestments() {
                apiService.getInvestmentList().then(response => {
                    this.investments = response.data.data;
                    this.investmentSize = this.investments.length;
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
            addNewInvestment() {
                if (localStorage.getItem("isAuthenticated")
                    && JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
                    router.push('/investment-create');
                } else {
                    router.push("/auth");
                }
            },
            updateInvestment(investment) {
                router.push('/investment-create/' + investment.pk);
            },
            deleteInvestment(investment) {
                if(confirm("Do you really want to delete?")) {
                    apiService.deleteInvestment(investment.pk).then(response => {
                        if (response.status === 204) {
                            router.push('/investment-list/deleted/')
                            this.getInvestments()
                        }
                    }).catch(error => {
                        if (error.response.status === 401) {
                            localStorage.clear();
                            router.push("/auth");
                        }
                    });
                }
            }
        }
    };
</script>
<style>
    button {
        padding: 1rem;
        border: 0;
        cursor: pointer;
    }
</style>
