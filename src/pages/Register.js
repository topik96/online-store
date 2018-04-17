import axios from 'axios'
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, AppRegistry, TextInput, Button, Alert, TouchableOpacity, AsyncStorage
} from 'react-native';
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
        
        const dataUser = {
            username: this.state.username,
            email: this.state.mail,
            password: this.state.pass
        }
        console.log(this.state)
        axios.post('http://192.168.100.15:5000/api/user', dataUser)
            .then(res => {
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <View style={Style.container}>
                <TextInput
                    placeholder={"Input Username"}
                    style={Style.inputText}
                    onChangeText={(iUser) => {
                        this.setText('username', iUser)
                    }}
                />
                <TextInput
                    placeholder={"Input Mail"}
                    style={Style.inputText}
                    onChangeText={(iMail) => { this.setText('mail', iMail) }}
                />
                <TextInput
                    placeholder={"Input Password"}
                    style={Style.inputText}
                    onChangeText={(iPass) => {
                        this.setText('pass', iPass)
                    }}
                />
                <Button
                    onPress={() => {
                        //this.sendDataUser()
                        
                    }}
                    title="Register"
                />
            </View>
        )
    }
}
