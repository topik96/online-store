import React from 'react'
import {
    View, TextInput, Alert, Image, AsyncStorage, ScrollView
} from 'react-native'
import { Text, Header, Button, Toast, Thumbnail, ListItem, List, Body, Right, Left, Icon, Item, Input } from 'native-base'
import { StackNavigator } from 'react-navigation'
import CartList from '../pages/CartList'
export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [], total: [], qty: 1, orderDetail: []
        }
        this.getSubTotal = this.getSubTotal.bind(this)
    }

    componentWillMount() {
        if (this.props.items !== null) {
            this.setState({
                cart: this.props.items
            })
        }
    }

    total() {
        if (this.props.items !== null) {
            for (let a = 0; a < this.props.items; a++) {
                return this.props.items[a].id
            }
        }
    }
    showCart() {
        if (this.props.items !== null) {
            return this.props.items.map((item) => {
                return <CartList item={item} key={item.id} getSubTotal={this.getSubTotal} />
            })
        } else {
            return <Text>No items selected</Text>
        }
    }

    getSubTotal(data) {
        this.state.total.push(data)
        this.setState({
            total: [...this.state.total]
        })
    }

    totalPaid() {
        if (this.props.items !== null) {
            let total = this.props.items.length > 0 ? this.props.items.map(item => item.quantity * item.price).reduce((a, b) => a + b) : 0
            return total
        }
        return 0
    }

    sendPayment(){
        let total = this.totalPaid()
        let number = Math.random()
        let idOrder = 'TPKP' + number.toString().substring(3, 9)
        return AsyncStorage.setItem('checkout', JSON.stringify({ 'id': idOrder, 'total': this.totalPaid() }))
        
    }

    render() {
        this.sendPayment()
        return (
            <View>
                <Header>
                    <Right>
                        <Button transparent danger onPress={() => {
                            this.props.navigation.navigate('Checkout')
                            this.sendPayment()
                        }}>
                            <Text>Checkout</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    {this.showCart()}
                    <Text style={{ marginRight: 10 }}>Total Paid : ${this.totalPaid()}</Text>
                </ScrollView>
            </View>
        )
    }
}