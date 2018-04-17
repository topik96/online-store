import React from 'react'
import {
    View, TextInput, Alert, Image, AsyncStorage, ScrollView
} from 'react-native'
import { Text, Header, Button, Toast, Thumbnail, ListItem, List, Body, Right, Left, Icon, Item, Input } from 'native-base'
import { StackNavigator } from 'react-navigation'
import ButtonCustom from '../components/ButtonCustom'
import CartList from '../pages/CartList'
export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [], total: [], qty: 1, 
        }
        this.getSubTotal = this.getSubTotal.bind(this)
    }

    componentWillMount() {
        this.setState({
            cart: this.props.items
        })
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
                return <CartList item={item} key={item.id} getSubTotal={this.getSubTotal}/>
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

        console.log('ini data total',this.state.total)
        console.log("ini total", this.state.total.reduce((a,b)=>a+b))
        
    }
    render() {
        console.log('iini state total',typeof this.state.total)
        return (
            <View>
                <Header>
                    <Right>
                        <Button transparent danger onPress={() => {
                            this.props.navigation.navigate('Checkout')
                            AsyncStorage.removeItem('item')
                        }}>
                            <Text>Checkout</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    {this.showCart()}
                    <Text style={{ marginRight: 10 }}>Total Paid : {this.state.total.length > 0 ? this.state.total.reduce((a,b)=>a+b) : 0}</Text>
                </ScrollView>
            </View>
        )
    }
}