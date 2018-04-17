import React from 'react'
import {
    View, TextInput, Alert, Image, AsyncStorage, ScrollView
} from 'react-native'
import { Text, Header, Button, Toast, Thumbnail, ListItem, List, Body, Right, Left, Icon, Item, Input } from 'native-base'
import { StackNavigator } from 'react-navigation'
import ButtonCustom from '../components/ButtonCustom'
export default class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            cart: [], total: [], qty: 1, subTotal: () => { }, sub: []
            // subTotal:()=>{ return this.props}
        }
    }

    componentWillMount() {
        console.log('1')
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
                console.log('showcart' + item)
                let subTotal = 0
                return <List key={item.id}>
                    <ListItem onLongPress={() => {
                        Alert.alert(
                            'Confirm',
                            'Delete item',
                            [
                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                          )
                    }}>
                        <Right>
                            <Item>
                                <Input placeholder='qty?' onChangeText={(qty) => {
                                    this.setState({

                                    })

                                }}>
                                </Input>
                            </Item>
                        </Right>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note color={'black'}>${item.price}</Text>
                            <Text note>Sub Total : ${this.state.sub[item.id]}</Text>
                        </Body>

                    </ListItem>
                </List>
            })
        } else {
            return <Text>No items selected</Text>
        }
    }
    render() {
        console.log(this.state.total)
        console.log('this function ' + this.showCart())
        console.log('ini state' + this.state.cart)
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
                    <Text style={{ marginRight: 10 }}>Total Paid : $20000</Text>
                </ScrollView>
            </View>
        )
    }
}