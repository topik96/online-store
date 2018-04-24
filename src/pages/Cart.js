import React from 'react'
import {
    View,
    TextInput,
    Alert,
    Image,
    AsyncStorage,
    ScrollView
} from 'react-native'
import {
    Text,
    Header,
    Button, Toast, Thumbnail, ListItem, List, Body, Right, Left, Icon, Item, Input
} from 'native-base'
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
                return <CartList item={item} key={item.id} getSubTotal={this.getSubTotal} getItem={this.props.getItem} />
            })
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
        } else {
            return 0
        }
    }

    sendPayment() {
        let total = this.totalPaid()
        return AsyncStorage.setItem('checkout', total.toString())
    }

    render() {
        this.sendPayment()
        return (
            <View>
                <Header>
                    <Right>
                        <Button transparent danger onPress={() => {
                            if (this.totalPaid() !== 0) {
                                this.sendPayment()
                                this.props.navigation.navigate('Checkout')
                            } else Alert.alert('cart is null')
                            
                        }}>
                            <Text>Checkout</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    {this.showCart()}
                    <View style={{ height: 40, backgroundColor: '#03A9F4',paddingTop:10 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Total ${this.totalPaid()}</Text>
                    </View>
                </ScrollView>

            </View>
        )
    }
}
