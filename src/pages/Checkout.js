import React from 'react'
import { View, Alert, AsyncStorage } from 'react-native'
import {
    ListItem,
    Body,
    List,
    Content,
    Text,
    Button,
    Right,
    Left,
    Card,
    CardItem,
    Container,
    Header,
    Icon,
    Title,
    Item,
    Input
} from 'native-base'
import axios from 'axios'
import Payment from './Payment'
export default class Checkout extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '', 
            address: '', 
            phone: '', 
            paymentOrder: 0, 
            idOrder: '', 
            email: '', 
            name: '', 
            redirectURL: '', 
            userID:0,
            tempCart:[]
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('idUser')
            .then(res => {
                axios.get(`http://192.168.100.10:3000/api/users/?id=${res}`)
                    .then(r => {
                        this.setState({
                            userID: r.data[0].id,
                            username: r.data[0].username,
                            phone: r.data[0].phone,
                            address: r.data[0].address
                        })
                        console.log(r.data[0].phone + ' address ' + r.data[0].address)
                    })
            })

        AsyncStorage.getItem('itemInCart')
            .then(res=>{
                this.setState({
                    tempCart:JSON.parse(res)
                })
                
            })

        AsyncStorage.getItem('checkout')
            .then(res => {
                let data = res
                this.setState({
                    paymentOrder: data,
                })
                console.log(data + ' Data order ')
            })
    }

    requestRedirectUrl() {
        let data = {
            "users_id": parseInt(this.state.userID),
            "data": this.state.tempCart,
            "total": this.state.paymentOrder
        }

        axios.post(`http://192.168.100.10:3000/api/orders`, data)
            .then(res => {
                this.props.navigation.navigate('Payment',res.data.redirect_url)
            })
            .catch(err => {
                console.log(err + ' gan')
            })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            Alert.alert(
                                'Notice',
                                'Cancel Payment',
                                [
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    {
                                        text: 'OK', onPress: () => {
                                            this.props.navigation.navigate('TabView')
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Payment </Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem bordered header>
                            <Text>Dear {this.state.username}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Please make your payment of <Text style={{ fontWeight: 'bold' }}>${this.state.paymentOrder}</Text></Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button full primary onPress={() => {
                                this.requestRedirectUrl()
                            }}>
                                <Text>                           Confirm                             </Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}