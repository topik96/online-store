import React, { Component } from 'React'
import { Button, Left, Right, Body } from 'native-base'
import { View, Text } from 'react-native'
import Cart from '../pages/Cart'
class ButtonCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,sendQTY
        }
    }
    componentWillMount() {
        console.log('dfdfdfdfd' + this.props.qty)
    }
    increment() {
        this.setState({
            quantity: this.state.quantity + 1
        })
    }
    decrement() {
        if (this.state.quantity > 1) {
            this.setState({
                quantity: this.state.quantity - 1
            })
        }
    }
    setQTY(newValue){
        this.setState({
            sendQTY:newValue
        })
    }

    render() {
        
        const { navigate } = this.props.navigation
        return (
            <View>
                <Button transparent onPress={() => {
                    this.increment()
                    this.setQTY(this.state.quantity)
                }}>
                    <Text style={{ color: 'blue', fontSize: 15 }}>
                        +</Text>
                </Button>
                <Text>{this.state.quantity}</Text>
                <Button transparent onPress={() => {
                    this.decrement()
                    this.setQTY(this.state.quantity)
                }} >
                    <Text style={{ color: 'blue' }}>
                        -</Text>
                </Button>

            </View>
        )
    }
}
export default ButtonCustom