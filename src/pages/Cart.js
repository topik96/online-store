import React from 'react'
import {
    View, TextInput, Alert, Image, AsyncStorage, ScrollView
} from 'react-native'
import { Text, Header, Button, Toast, Thumbnail, ListItem, List, Body, Right, Left, Icon, Item, Input } from 'native-base'
import { StackNavigator } from 'react-navigation'
import ButtonCustom from '../components/ButtonCustom'
export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qty: 2,
            total: 0
        }
    }

    deleteItem() {

    }

    showCart() {
        let total = 0
        if (this.props.items !== null) {
            return this.props.items.map((item) => {
                return <List key={item.id}>
                    <ListItem onLongPress={()=>{
                        Alert.alert('delete')
                    }}>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note color={'black'}>${item.price}</Text>
                            <Text note>Sub Total : ${item.price * this.state.qty}</Text>
                            <Button key={item.id} style={{ alignContent: 'center' }} transparent onPress={() => {
                                this.props.items.pop()
                            }}>
                                <Text>Delete</Text>
                            </Button>
                        </Body>
                        <Right>
                            <ButtonCustom />
                        </Right>

                    </ListItem>

                </List>
            })

        } else {
            return <Text>No items selected</Text>
        }
    }
    render() {
        console.log("===================================" + this.state.total)
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
                </ScrollView>
            </View>
        )
    }
}