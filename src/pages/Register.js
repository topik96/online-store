import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, AppRegistry, TextInput, Button, Alert, TouchableOpacity
} from 'react-native';
import Style from './style/style'


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',pass:'',mail:''
        }
    }
    render(){
        return(
            <View style={Style.container}>
            <TextInput
                placeholder={"Input Username"}
                style={Style.inputText}
            />
            <TextInput
                placeholder={"Input Mail"}
                style={Style.inputText}
            />
            <TextInput
                placeholder={"Input Password"}
                style={Style.inputText}/>
            <Button
            title="Register"
            />
        </View>
        )
    }
}


export default Register;
