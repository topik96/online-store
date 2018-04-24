import React from 'react'
import { StackNavigator } from 'react-navigation'
import Register from './pages/Register'
import ShowProducts from './pages/showProducts'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Indicator } from './pages/Indicator'
import TabView from './pages/TabView'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Profile from './pages/Profile'
import { Root } from 'native-base'

const Nav = StackNavigator({
    Indicator: { screen: Indicator },
    Login: {
        screen: Login, navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register, navigationOptions: {
            title: 'Register'
        }
    },
    ShowProducts: {
        screen: ShowProducts, navigationOptions: {
            headerLeft: null
        }
    },
    Profile: { screen: Profile },
    TabView: {
        screen: TabView, navigationOptions: {
            header: null
        }
    },
    Cart: {
        screen: Cart, navigationOptions: {
            title: 'Your Cart',
            headerLeft: null
        }
    },
    Checkout: {
        screen: Checkout, navigationOptions: {
            header: null
        }
    },
    Payment: { screen: Payment,navigationOptions:{
        title:'Payment Proccess'
    } }
})


export default () => <Root><Nav /></Root>