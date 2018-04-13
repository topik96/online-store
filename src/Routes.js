import React from 'react'
import { StackNavigator } from 'react-navigation'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
// import Indicator from './pages/Indicator'
import TabView from './pages/TabView'
import Checkout from './pages/Checkout'

const Nav = StackNavigator({
    // Indicator:{screen: Indicator},
    Login: { screen: Login, navigationOptions:{
        header:null
    }},
    Register: { screen: Register, navigationOptions:{
        title:'Register'
    }},
    Home: { screen: Home,  navigationOptions:{
        headerLeft:null
    }},
    Profile: {screen: Profile, navigationOptions:{
        title:'Setting',
        headerLeft:null
    }},
    TabView:{screen:TabView, navigationOptions:{
        header:null
    }},
    Cart:{screen:Cart,navigationOptions:{
        title:'Your Cart',
        headerLeft:null
    }},
    Checkout:{screen:Checkout,navigationOptions:{
        title:'Payment',
        headerLeft:null
    }}


})


export default Nav