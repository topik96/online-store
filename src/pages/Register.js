import axios from 'axios'
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Alert, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons'
import { Item, Container, Form, Input, Button, Content, Label } from 'native-base'
import Style from './style/style'
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', pass: '', mail: ''
        }
    }
    setText(key, string) {
        this.setState({
            [key]: string
        })
    }
    sendDataUser() {
        let validateEmail = /\S+@\S+\.\S+/.test(this.state.mail);
        if (validateEmail){
            this.props.navigation.navigate('Login')
            const dataUser = {
                username: this.state.username,
                
                password: this.state.pass,
               
                email: this.state.mail,
                
            }
            console.log(this.state)
            axios.post('http://192.168.100.10:3000/api/users/register', dataUser)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            Alert.alert('improve your mail')
        }
    }
    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#03A9F4' }}>
                    <Form style={{ padding: 20 }}>
                        <Item floatingLabel>
                            <Label style={{ color: 'white' }}>Username</Label>
                            <Input style={{ color: 'white' }} autoCapitalize={false} onChangeText={(iUsername) => {
                                this.setState({
                                    username: iUsername
                                })
                            }} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ color: 'white' }}>Email</Label>
                            <Input style={{ color: 'white' }} autoCapitalize={false} onChangeText={(iEmail) => {
                                this.setState({
                                    mail: iEmail
                                })
                            }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{ color: 'white' }}>Password</Label>
                            <Input style={{ color: 'white' }} secureTextEntry autoCapitalize={false} onChangeText={(iPassword) => {
                                this.setState({
                                    pass: iPassword
                                })
                            }} />
                        </Item>
                        <Text></Text>
                        <Button style={{ backgroundColor: 'white', color: '#4CAF50' }} block transparent primary onPress={() => {
                            this.sendDataUser()
                           
                        }}>
                            <Text style={{ color: '#03A9F4', fontWeight: 'bold' }}>Register</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}
