import axios from 'axios'
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, ImageBackground, Image, Alert, AsyncStorage
} from 'react-native';
import { Content, Button, Item, Input, Container, Form, Label, Header, Body } from 'native-base'
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      token: ''
    }
  }
  setText(key, string) {
    this.setState({
      [key]: string
    })
  }

  loginValidation() {
    axios.post('http://192.168.100.10:3000/api/users/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        if (res.data) {
          console.log(res.data.id,'GGggggggggggggg')
          AsyncStorage.setItem('login', 'success')
          AsyncStorage.setItem('idUser', JSON.stringify(res.data.id))
          this.props.navigation.navigate('TabView')
        } else Alert.alert('Username or password inccorect')
      })
      .catch(err => {

      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: '#03A9F4' }} >
        <Content style={{ padding: 30 }}>
          <Form style={{ marginTop: 80 }}>
            <Image style={{ width: 185, height: 170, marginLeft: 60 }} source={require('../images/login_logo.png')} />
            <Item floatingLabel last>
              <Label style={{ color: 'white' }}>Username</Label>
              <Input style={{ color: 'white' }} autoCapitalize={false} onChangeText={(iUsername) => {
                this.setState({
                  username: iUsername
                })
              }} />
            </Item>
            <Item floatingLabel last>
              <Label style={{ color: 'white' }}>Password</Label>
              <Input style={{ color: 'white' }} secureTextEntry autoCapitalize={false} onChangeText={(iPassword) => {
                this.setState({
                  password: iPassword
                })
              }} />
            </Item>
            <Text></Text>
            <Button style={{ backgroundColor: 'white', color: '#4CAF50' }} block transparent primary onPress={() => {
              this.loginValidation()

            }}>
              <Text style={{ color: '#03A9F4', fontWeight: 'bold' }}>Login</Text>
            </Button>
            <Text></Text>
            <Button style={{ backgroundColor: 'white' }} block transparent onPress={() => {
              navigate('Register')
            }}>
              <Text style={{ color: '#03A9F4', fontWeight: 'bold' }}>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
