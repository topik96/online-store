import React from 'react'
import { View, Alert } from 'react-native'
import {
    ListItemBody, List, Content, Text, Button, Right, Left, Card, CardItem, Body, Container, Header, Icon, Title,Item,Input
} from 'native-base'
export default class Checkout extends React.Component {
    componentWillMount(){
        
    }
    
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Payment</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem bordered header>
                            <Text>Dear Customer</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Please make your payment of <Text style={{fontWeight:'bold'}}>$10000</Text></Text>
                                <Item>
                                    <Input placeholder="Input bank account" />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button full primary>
                                <Text>                           Submit                             </Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}