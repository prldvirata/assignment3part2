import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Auth from '@/components/Auth.vue'
import Register from '@/components/Register'
import CustomerList from '@/components/CustomerList'
import CustomerCreate from '@/components/CustomerCreate'
import MyCustomerList from '@/components/MyCustomerList'
import InvestmentList from '@/components/InvestmentList'
import InvestmentCreate from '@/components/InvestmentCreate'
import StockList from '@/components/StockList'
import StockCreate from '@/components/StockCreate'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customer-list',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/customer-list/:msg',
    name: 'CustomerUpdatedList',
    component: CustomerList
  },
  {
    path: '/mycustomer-list',
    name: 'MyCustomerList',
    component: MyCustomerList
  },
  {
    path: '/mycustomer-list/:msg',
    name: 'MyCustomerUpdatedList',
    component: MyCustomerList
  },

  {
    path: '/customer-create',
    name: 'CustomerCreate',
    component: CustomerCreate
  },
  {
    path: '/customer-create/:pk',
    name: 'CustomerUpdate',
    component: CustomerCreate
  },
  {
    path: '/investment-list',
    name: 'InvestmentList',
    component: InvestmentList
  },
  {
    path: '/investment-list/:msg',
    name: 'InvestmentUpdatedList',
    component: InvestmentList
  },
  {
    path: '/investment-create',
    name: 'InvestmentCreate',
    component: InvestmentCreate
  },
  {
    path: '/investment-create/:pk',
    name: 'InvestmentUpdate',
    component: InvestmentCreate
  },
  {
    path: '/stock-list',
    name: 'StockList',
    component: StockList
  },
  {
    path: '/stock-list/:msg',
    name: 'StockUpdatedList',
    component: StockList
  },
  {
    path: '/stock-create',
    name: 'StockCreate',
    component: StockCreate
  },
  {
    path: '/stock-create/:pk',
    name: 'StockUpdate',
    component: StockCreate
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path:'/register',
    name: 'Register',
    component: Register
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
