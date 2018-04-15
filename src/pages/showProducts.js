import axios from 'axios'
import React from 'react'
import { View, Alert, ScrollView, ActivityIndicator, image, AsyncStorage } from 'react-native'
import {
    ListItem, Thumbnail, Body, List, Content, Text, Button, Right, Header, Input, Icon, Item, Toast, Card,CardItem
} from 'native-base'
export default class ShowProducts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProducts: [],
            tempCart: [],
            showToast: false,
            productName: '',
            stock: 0,
        }
    }

    componentWillMount() {
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

    findId(id, name, price) {
        let a = this.state.tempCart.find(arr => {
            return arr.id == id
        })
        if (a) {
            console.log('item is added to cart')
        } else {
            this.state.tempCart.push({ 'id': id, 'name': name, 'price': price })
            AsyncStorage.setItem('itemInCart', JSON.stringify(this.state.tempCart))
                .then(res => {
                    console.log('added to local storage')
                })
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
                                <Thumbnail square size={80} source={{ uri: item.image }} />
                                <Body>
                                    <Text>{item.name}</Text>
                                    <Text note>{item.description}</Text>
                                    <Text note>${item.price}</Text>
                                </Body>
                                <Right>
                                    <Button transparent disabled={this.state.isBuy} onPress={() => {
                                        this.findId(item.id, item.name, item.price)
                                        Toast.show({
                                            text: "Added to cart",
                                            position: "top",
                                            type: "primary",
                                            buttonText: "X",
                                            duration: 3000
                                        })
                                    }}>
                                        <Text>Buy</Text>
                                    </Button>
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
                <Text style={{fontWeight:'bold'}}>Results :
            <Text style={{ color: 'blue', fontWeight: 'bold' }}> {this.state.productName}</Text></Text>
            </CardItem>
        }
    }

    render() {
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