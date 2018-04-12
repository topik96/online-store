import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, AppRegistry, TextInput, Button, Alert, TouchableOpacity, AsyncStorage
} from 'react-native';
import Style from './style/style'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      mail:'',password:''
    }
    
  }
   setText(key, string) {
    this.setState({
      [key]:string
    })
   }
   loginValidation(mail,password){
      if(mail==="User@gmail.com" && password==="12345"){
         this.props.navigation.navigate("TabView")
         AsyncStorage.setItem("Login",'success')
      }else{
        Alert.alert('wrong mail or password')
      }
   }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Style.container}>
        <TextInput
          placeholder={"Input Mail"}
          style={Style.inputText}
          onChangeText={(text)=>this.setText('mail',text)}
        />
        <Text>{this.state.text}</Text>
        <TextInput
          placeholder={"Input Password"}
          style={Style.inputText}
          onChangeText={(pw)=>this.setText('password',pw)}
        />
        <Button
          onPress={() =>  
          this.loginValidation(this.state.mail,this.state.password)}
          title="Sign In"
        />
        <Button
          onPress={() =>navigate('Register')}
          title="Register"
        />
      </View>
    )
  }
}


