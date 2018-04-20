import axios from 'axios'
import React from 'react'
import { View, Alert, ScrollView, ActivityIndicator, image, AsyncStorage } from 'react-native'
import {
    ListItem, Thumbnail, Body, List, Content, Text, Button, Right, Header, Input, Icon, Item, Toast, Card, CardItem
} from 'native-base'
import ButtonQuantity from '../components/ButtonaQuantity'
export default class ShowProducts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProducts: [],
            tempCart: [],
            showToast: false,
            productName: '',
            stock: 0,
            quantity: 1
        }
        this.getQTY = this.getQTY.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.fetchData().done()
        AsyncStorage.getItem('itemInCart')
            .then(resData => {
                if (resData == null) {
                    console.log('kosong')
                } else {
                    this.setState({
                        tempCart: JSON.parse(resData)
                    })
                }
            })
    }

    async fetchData() {
        let response = await fetch('https://private-5b737-tokoonline2.apiary-mock.com/show_products')
        let json = await response.json()
        let data = json
        this.setState({
            dataProducts: data
        })
    }

    getQTY(qty, id) {
        this.state.dataProducts.find(item => {
            return item.id === id
        }).quantity = qty
        this.setState({
            quantity: [...this.state.dataProducts]
        })

    }

    showToast(message, duration, type) {
        Toast.show({
            text: message,
            position: "top",
            type: type,
            buttonText: "X",
            duration: duration
        })
    }

    findId(id, name, price, qty) {
        let a = this.state.tempCart.find(arr => {
            return arr.id == id
        })
        if (a) {
            console.log('item is added to cart')
        } else {
            console.log(qty + ' fiebifebfiebeifbeif')
            if (qty != undefined) {
                console.log(qty + ' fiebifebfiebeifbeif')
                this.state.tempCart.push({ 'id': id, 'name': name, 'price': price, 'quantity': qty })
                AsyncStorage.setItem('itemInCart', JSON.stringify(this.state.tempCart))
                    .then(res => {
                        this.showToast('Added to cart', 2000, 'primary')
                    })
            } else {
                this.showToast('Add quantity', 1000,'danger')
            }
        }
    }

    showProducts() {
        if (this.state.dataProducts.length === 0) {
            return <ActivityIndicator size='large' />
        } else {
            return this.state.dataProducts.map(item => {
                if (item.name.toLowerCase().includes(this.state.productName.toLowerCase())) {
                    if (item.stock > 0) {
                        return <List key={item.id} >
                            <ListItem style={{ backgroundColor: 'white' }} onLongPress={() => {
                                Alert.alert('Loading Image...')
                            }}>
                                <Thumbnail square size={80} source={{ uri: "https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg" }} />
                                <Body>
                                    <Text>{item.name}</Text>
                                    <Text note>{item.description}</Text>
                                    <Text note>${item.price}</Text>
                                    <Button transparent onPress={() => {
                                        this.findId(item.id, item.name, item.price, item.quantity)

                                    }}>
                                        <Text>Buy</Text>
                                    </Button>
                                </Body>

                                <Right>
                                    <ButtonQuantity quantity={this.getQTY} id={item.id} />
                                </Right>
                            </ListItem>
                        </List>
                    }
                }
            })
        }
    }

    alertFoundItem() {
        if (this.state.productName !== '') {
            return <CardItem bordered>
                <Text style={{ fontWeight: 'bold' }}>Results :
            <Text style={{ color: 'blue', fontWeight: 'bold' }}> {this.state.productName}</Text></Text>
            </CardItem>
        }
    }

    render() {

        this.state.dataProducts.map(item => {
            console.log('id :', item.id, ' qty: ', item.quantity)
        })
        console.log(this.state.tempCart)
        return (
            <View>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={nm => {
                            this.setState({ productName: nm })
                        }} />
                    </Item>
                </Header>
                <ScrollView>
                    <Content padder>
                        <Card>
                            {this.alertFoundItem()}
                            {this.showProducts()}
                        </Card>
                    </Content>
                </ScrollView>
            </View>
        )
    }
}