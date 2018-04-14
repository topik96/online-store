import axios from 'axios'
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, AppRegistry, TextInput, Button, Alert, TouchableOpacity, AsyncStorage
} from 'react-native';
import Style from './style/style'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '', password: ''
    }
  }
  setText(key, string) {
    this.setState({
      [key]: string
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Style.container}>
        <TextInput
          placeholder={"Input Mail"}
          style={Style.inputText}
          onChangeText={(text) => this.setText('mail', text)}
        />
        <Text>{this.state.text}</Text>
        <TextInput
          placeholder={"Input Password"}
          secureTextEntry={true}
          style={Style.inputText}
          onChangeText={pw => this.setText('password', pw)}
        />
        <Button
          onPress={() => navigate('TabView') }
          // this.loginValidation(this.state.mail,this.state.password)
          title="Sign In"
        />
        <Button
          onPress={() => { navigate('Register') 
          AsyncStorage.removeItem('item')}}
          title="Register"
        />
      </View>
    )
  }
}


