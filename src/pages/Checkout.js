import React from 'react'
import { View, Alert,AsyncStorage } from 'react-native'
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
    constructor(){
        super()
        this.state = {
            username:'', address:'',phone:'',paymentOrder:0,idOrder:'',email:'',name:'',redirectURL:''
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('idUser')
        .then(res=>{
            axios.get(`http://192.168.100.29:5000/api/users/${res}`)
            .then(r=>{
                this.setState({
                    username:r.data[0].username,
                    phone:r.data[0].phone,
                    address:r.data[0].address
                })
                console.log(r.data[0].phone +' address '+r.data[0].address)
            })
        })

        AsyncStorage.getItem('checkout')
        .then(res=>{
            let data=JSON.parse(res)
            this.setState({
                paymentOrder:data.total,
                idOrder:data.id
            })
            console.log(data.total+' Data order ')
        })
    }

    requestRedirectUrl(){
        let data = JSON.stringify({
            "transaction_details": {
              "order_id": this.state.idOrder,
              "gross_amount": this.state.paymentOrder
            }
          })
    
    let axiosConfig = {
        headers:{
           'Accept':'application/json',
           'Content-Type':'application/json',
           'Authorization':`Basic U0ItTWlkLXNlcnZlci13OFN3cFlmZUN6Umt4QXE4cFJTajNUWHM6`
        }
    }
    axios.post(`https://app.sandbox.midtrans.com/snap/v1/transactions`,data, axiosConfig)
    .then(res=>{
        this.props.navigation.navigate('Payment',res.data.redirect_url)
    })
    .catch(err=>{
        console.log(err +' gan')
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
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => {
                                      this.props.navigation.navigate('TabView')
                                    }},
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
                                <Item>
                                    <Input placeholder="Received Name" onChangeText={(txt)=>{
                                        this.setState({
                                            name:txt
                                        })
                                    }}/>
                                    </Item>
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