const axios = require('axios')
import React from 'react'
import { AsyncStorage } from 'react-native'
import {
    View, Alert
} from 'react-native'
import {
    Container, Header, Footer, Icon, Right, Body, Button, Content, Tab, Tabs, Item, Input, Text, List, ListItem, Left
} from 'native-base'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', mail: '', phone: '', address: ''
        }
    }
    getData() {
        axios.get('https://private-5b737-tokoonline2.apiary-mock.com/users/1')
            .then(res => {
                console.log(res.data[0].password)
                this.setState({
                    username: res.data[0].username,
                    mail: res.data[0].email,
                    phone: res.data[0].phone,
                    address: res.data[0].address
                })
            })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <View>
                <Header>
                    <Right>
                        <Button transparent onPress={() => this.getData()}>
                            <Text>Edit</Text>
                        </Button>
                    </Right>

                </Header>
                <List>
                    <ListItem>
                        <Left>
                            <Text>Username </Text>
                        </Left>
                        <Body>
                            <Text style={{ color: "blue" }}>{this.state.username}</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>email</Text>
                        </Left>
                        <Body>
                            <Text style={{ color: "blue",marginLeft:10 }}>{this.state.mail}</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>phone </Text>
                        </Left>
                        <Body>
                            <Text style={{ color: "blue" }}>{this.state.phone}</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>address </Text>
                        </Left>
                        <Body>
                            <Text style={{ color: "blue" }}>{this.state.address}</Text>
                        </Body>
                    </ListItem>

                    <Button block danger onPress={() => {
                        this.props.navigation.navigate('Login')
                        AsyncStorage.removeItem('login')
                    }}>
                        <Text>Sign Out</Text>
                    </Button>

                </List>

            </View>

        )
    }
}
//username password email address phone 
export default Profile