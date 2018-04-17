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
            username: '', mail: '', phone: '', address: '',id:''
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('id')
        .then(res=>{
            console.log (res)
            this.setState({
                id:res
            })
        })
        axios.get(`http://192.168.100.41:5000/api/users/54`)
            .then(res => {
                console.log(res )
                // console.log(res.data.id)
                // this.setState({
                //     username: res.data.username,
                //     mail: res.data.email,
                //     phone: res.data.phone,
                //     address: res.data.address
                // })
            })
    }

    render() {
        return (
            <View>
                <Header>
                    <Right>
                        <Button transparent onPress={() => this.navigation.navigate('EditProfile')}>
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