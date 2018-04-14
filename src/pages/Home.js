import React, { Component } from 'react'
import {
    Platform, Image, StyleSheet, View, AppRegistry, ActivityIndicator, TextInput, Alert, ScrollView, AsyncStorage
} from 'react-native'
import {
    Container, Header, Footer, Icon, Button, Content, Tab, Tabs, Item, Input, Text
} from 'native-base'
import { PricingCard } from 'react-native-elements'
import { stringify } from 'querystring';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nmPoduct: '',
            dtProduct: [],
            items: [],
            
        }
    }

    UNSAFE_componentWillMount() {
        this.fetchData().done()
        AsyncStorage.getItem('item').then(res => {
            if (res == null) console.log('kosong bray')
            else {
                this.setState({ items: JSON.parse(res) })
                console.log('=====================' + this.state.items)
            }
        })
    }

    async fetchData() {
        let response = await fetch('https://private-5b737-tokoonline2.apiary-mock.com/show_products')
        let json = await response.json()
        let data = json
        this.setState({
            dtProduct: data
        })
    }
showProduct() {
    if (this.state.dtProduct.length === 0) {
        return <ActivityIndicator size="large" />
    } else {
        return this.state.dtProduct.map(product => {
            if (product.name.toLowerCase().includes(this.state.nmPoduct.toLowerCase())) {
                return <PricingCard
                    key={product.id}
                    color='#4f9deb'
                    title={product.name}
                    price={product.price}
                    info={[product.description]}
                    button={{ title: 'Add to cart' }}
                    onButtonPress={() => {


                        // this.state.items.map(function (item) {
                        //     if (item.id!==product.id) {
                        // this.state.items.push({ 'id': product.id, 'name': product.name, 'price': product.price })
                        // AsyncStorage.setItem('item', JSON.stringify(this.state.items))
                        // console.log(product.id + ' added to cart')
                        //     }
                        // })


                    }}
                />
            }
        })
    }
}
render() {
    return (
        <View>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChangeText={nm => {
                        this.setState({ nmPoduct: nm })
                    }} />
                </Item>
            </Header>
            <ScrollView>
                {this.showProduct()}
            </ScrollView>
        </View>
    )
}
}
