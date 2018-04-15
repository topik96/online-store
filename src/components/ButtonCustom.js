import React, { Component } from 'React'
import { Button } from 'native-base'
import { View, Text } from 'react-native'
import Cart from '../pages/Cart'
class ButtonCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1
        }
    }

    increment() {
        this.setState({
            quantity: this.state.quantity + 1
        })
    }

    decrement() {
        if(this.state.quantity>1){
            this.setState({
                quantity: this.state.quantity - 1
            })
        }
    }

    render() {

        return (
            <View style={{ marginRight: 20 }}>
                <Button transparent onPress={() => this.increment()}>
                    <Text style={{ color: 'blue', fontSize: 15 }}>
                        +
                    </Text>
                </Button>
                <Text>{this.state.quantity}</Text>
                <Button transparent onPress={() => this.decrement() }>
                    <Text style={{ color: 'blue' }}>
                        -
                    </Text>
                </Button>
            </View>
        )
    }
}
export default ButtonCustom