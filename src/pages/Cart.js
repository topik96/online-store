import React from 'react'
import {
    View, TextInput, Alert, Image, Text, AsyncStorage
} from 'react-native'
import { Header,Button,Toast  } from 'native-base'
import { StackNavigator } from 'react-navigation'


export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
    showCart() {
        if(this.props.items!== null){
            return this.props.items.map((item) => {
                return  <Text key={item.id}> {item.name} {item.price}</Text>
            })
        }else {
            return <Text>No items selected</Text>
        }
        
    }
    render() {
        console.log("===================================", this.props.items)
        return (
            <View>
                <Header>
                </Header>
                {this.showCart()}
                <Button block primary onPress={()=>{
                    this.props.navigation.navigate('Checkout')
                    AsyncStorage.removeItem('item')
                    
                    }}>
                    <Text>Checkout</Text>
                </Button>
            </View>
        )
    }
}