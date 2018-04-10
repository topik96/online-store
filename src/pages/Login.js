import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, AppRegistry, TextInput, Button, Alert, TouchableOpacity
} from 'react-native';

export default class Login extends Component{
   render(){
       return(
        <View>
          <TextInput
            placeholder={"Input Mail"}
            style={{height: 40,width:300, borderColor: 'green', borderWidth: 2}}
          />

          <TextInput
            placeholder={"Input Password"}
            style={{height: 40,width:300, borderColor: 'green', borderWidth: 2}}
          />
          
          <TouchableOpacity onPress={()=>Alert.alert('YourName is Topik')}>
            <View>
              <Text>Sign In</Text>
            </View>
          </TouchableOpacity>
        
        </View>
       
    )
   }  
}


