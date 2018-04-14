import React from 'react'
import {
    View, TextInput, Alert, Image, AsyncStorage, ScrollView
} from 'react-native'
import { Text, Header, Button, Toast, Thumbnail, ListItem, List, Body, Right, Left, Icon } from 'native-base'
import { StackNavigator } from 'react-navigation'
import ButtonCustom from '../components/ButtonCustom'
export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qty:1
        }
    }

    showCart() {
        if (this.props.items !== null) {
            let total = 0
            return this.props.items.map((item) => {
    
                let qty = this.state.qty
                total += item.price
                return <View>
                    <ListItem>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.price}</Text>
                            <Text note>{total}</Text></Body>
                        <Right>
                            <ButtonCustom />
                        </Right>
                    </ListItem>
                </View>
            })
        } else {
            return <Text>No items selected</Text>
        }

    }
    render() {
        console.log("===================================", this.state.qty)
        return (
            <View>
                <Header>
                    <Right>
                    <Button transparent danger onPress={() => {
                        this.props.navigation.navigate('Checkout')
                        AsyncStorage.removeItem('item')
                    }}>
                        <Icon name='ios-cart' />
                        <Text>Checkout</Text>
                    </Button>
                    </Right>
                </Header>
                <ScrollView>
                    {this.showCart()}
                </ScrollView>
            </View>
        )
    }
}