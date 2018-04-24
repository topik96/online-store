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

    componentDidMount() {
        this.fetchData().done()
        AsyncStorage.getItem('idUser')
        .then(res=>{
            console.log(res,'===========================================================')
        })
        console.log(this.props.items,'efefeefef')
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

    addToCart(id, name, price, qty) {
        this.props.items.push({ 'id': parseInt(id), 'name': name, 'price': price, 'quantity': qty, 'stock': 3 })
        AsyncStorage.setItem('itemInCart', JSON.stringify(this.props.items))
            .then(res => {
                this.showToast('Added to cart', 2000, 'primary')
            })
    }

    findId(id, name, price, qty) {
        let a = []
        if (this.props.items !== null) {
            a = this.props.items.find(arr => {
                return arr.id == id
            })
            if (a) {
                console.log('added to cart')
            } else {
                if (qty > 0) {
                    this.props.items.push({ 'id': parseInt(id), 'name': name, 'price': price, 'quantity': qty, 'stock': 3 })
                    AsyncStorage.setItem('itemInCart', JSON.stringify(this.props.items))
                        .then(res => {
                            this.showToast('Added to cart', 2000, 'primary')
                        })
                } else {
                    this.showToast('Add quantity', 1000, 'danger')
                }
            }
        } else {
            if (qty>0){
                AsyncStorage.setItem('itemInCart', JSON.stringify([{ 'id': parseInt(id), 'name': name, 'price': price, 'quantity': qty, 'stock': qty }]))
                .then(res => {
                    this.showToast('Added to cart', 2000, 'primary')
                })
            }else{
                this.showToast('Add quantity', 1000, 'danger')
            }
        }
    }
    showProducts() {
        if (this.state.dataProducts.length === 0) {
            return <ActivityIndicator style={{paddingTop:240}} size='large' />
        } else {
            return this.state.dataProducts.map(item => {
                if (item.name.toLowerCase().includes(this.state.productName.toLowerCase())) {
                    if (item.stock > 0) {
                        return <List key={item.id}>
                            <ListItem style={{ backgroundColor: 'white' }} onLongPress={() => {
                                Alert.alert('Loading Image...')
                            }}>
                                <Thumbnail square large source={{ uri: "https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg" }} />
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
                   
                       
                            {this.alertFoundItem()}
                            {this.showProducts()}
                        
                    
                </ScrollView>
            </View>
        )
    }
}