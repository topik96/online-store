import axios from 'axios'
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, AppRegistry, TextInput, Button, Alert, TouchableOpacity, AsyncStorage
} from 'react-native';
import { Content } from 'native-base'
import Style from './style/style'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '', password: '', token: ''
    }
  }
  setText(key, string) {
    this.setState({
      [key]: string
    })
  }
  componentWillMount() {
    AsyncStorage.removeItem('login')
  }

  loginValidation() {
    axios.post('http://192.168.100.29:5000/api/users/auth', {
      username: this.state.mail,
      password: this.state.password
    })
      .then(res => {
        if (res.data) {
          console.log(res.data.id)
          AsyncStorage.setItem('login', 'success')
          AsyncStorage.setItem('idUser', JSON.stringify(res.data.id))
          this.props.navigation.navigate('TabView')
        } else Alert.alert('Username or password inccorect')
      })
      .catch(err => {
        console.log('error cu' + err)
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Style.container}>
        
          <TextInput
            autoCapitalize
            placeholder={"Input Mail"}
            style={Style.inputText}
            onChangeText={(text) => this.setText('mail', text)} />
          <Text>{this.state.text}</Text>
          <TextInput
            autoCapitalize
            placeholder={"Input Password"}
            secureTextEntry={true}
            style={Style.inputText}
            onChangeText={pw => this.setText('password', pw)} />
          <Button
            onPress={() => {
              this.loginValidation()
            }}
            title="Sign In" />
          <Button
            onPress={() => {
              navigate('Register')
              AsyncStorage.removeItem('itemInCart')
            }}
            title="Register" />
       
      </View>
    )
  }
}


