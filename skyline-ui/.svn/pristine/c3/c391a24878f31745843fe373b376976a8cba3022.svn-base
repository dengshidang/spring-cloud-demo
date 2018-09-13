import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Login from '@/page/user/Login'
import Register from '@/page/user/Register'
import Forget from '@/page/user/Forget'
import TransactionDetails from '@/page/c2c/TransactionDetails'
import TransactionList from '@/page/c2c/TransactionList'
import TransactionListByUser from '@/page/c2c/TransactionListByUser'
import Transactionorder from '@/page/c2c/Transactionorder'
import TransactionorderByUser from '@/page/c2c/transactionorderByUser'
import TransactionSaveOrUpdate from '@/page/c2c/TransactionSaveOrUpdate'
import TransactionState from '@/page/c2c/TransactionState'
import AccountSecurity from '@/page/personal/AccountSecurity'
import UserCertified from '@/page/personal/UserCertified'
import MyInvite from '@/page/personal/MyInvite'
import BussinessApplication from '@/page/personal/BusinessApplication'

import MyProperty from '@/page/property/MyProperty'
import PropertyDetails from '@/page/property/PropertyDetails'
import UserProtocol from '@/page/user/UserProtocol'
import  CoinCoin from '@/page/cc/CoinCoin'
import  MyOrderList from '@/page/cc/MyOrderList'
import  BuySellDetails from '@/page/cc/BuySellDetails'

import  Help from '@/page/help/Help'
import  Rate from  '@/page/cc/Rate'

import  Notice from  '@/page/help/Notice'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
        path:'/forget',
        name:'forget',
        component:Forget,

    },
    {
      path:'/login',
      name:'Login',
      component:Login,

    },
    {
      path:'/register',
      name:'register',
      component:Register,

    },

    {
      path:'/transactionList',
      name:'transactionList',
      component:TransactionList,

    },
    {
      path:'/transactionListByUser',
      name:'transactionListByUser',
      component:TransactionListByUser,

    },
    {
      path:'/transactionDetails/:id',
      name:'transactionDetails',
      component:TransactionDetails,

    },
    {
      path:'/transaction',
      name:'transactionSave',
      component:TransactionSaveOrUpdate,

    },
    {
      path:'/transaction/:transactionId',
      name:'transaction',
      component:TransactionSaveOrUpdate,

    },
    {
      path:'/transactionorderByUser',
      name:'transactionorderByUser',
      component:TransactionorderByUser,

    },
    {
      path:'/transactionorder/:id',
      name:'transactionorder',
      component:Transactionorder,

    },
    {
      path:'/TransactionState/:id',
      name:'transactionState',
      component:TransactionState,

    },
    {
      path:'/accountSecurity',
      name:'accountSecurity',
      component:AccountSecurity,


    },
    {
      path:'/userCertified',
      name:'userCertified',
      component:UserCertified,

    },
    {
      path:'/myInvite',
      name:'myInvite',
      component:MyInvite,

    },
    {
      path:'/businessApplication',
      name:'businessApplication',
      component:BussinessApplication,

    },
    {
      path:'/myProperty',
      name:'myProperty',
      component:MyProperty,

    },
    {
      path:'/propertyDetails',
      name:'propertyDetails',
      component:PropertyDetails,

    },
    {
      path:'/userProtocol',
      name:'userProtocol',
      component:UserProtocol,

    },
    {
      path:'/coinCoin',
      name:'coinCoin',
      component:CoinCoin
    },
    {
      path:'/myOrderList',
      name:'myOrderList',
      component:MyOrderList,

    },
    {
      path:'/buySellDetails',
      name:'buySellDetails',
      component:BuySellDetails,

    },
    {
      path:'/help',
      name:'help',
      component:Help,

    },
    {
      path:'/rate',
      name:'rate',
      component:Rate,

    },
    {
      path:'/notice',
      name:'notice',
      component:Notice
    }


 ]
})
