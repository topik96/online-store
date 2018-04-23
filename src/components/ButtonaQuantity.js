import React, { Component } from 'React'
import { Button, Left, Right, Body } from 'native-base'
import { View, Text } from 'react-native'
import Cart from '../pages/Cart'
class ButtonCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 0
        }
    }
    componentWillMount() {
        console.log(this.state.quantity)
    }
    increment() {
        this.setState({
            quantity: this.state.quantity + 1
        })
        this.props.quantity(this.state.quantity + 1, this.props.id)
    }
    decrement() {
        if (this.state.quantity > 0) {
            this.setState({
                quantity: this.state.quantity - 1
            })
        }
        this.props.quantity(this.state.quantity - 1, this.props.id)
    }
    render() {
        console.log(' from bqty' + this.state.quantity)
        return (
            <View>
                <Button style={{padding:3}} transparent onPress={() => {
                    this.increment()
                }}>
                    <Text style={{ color: 'blue', fontSize: 25,fontWeight:'bold'}}>
                        +</Text>
                </Button>
                <Text style={{ fontSize: 15 }}> {this.state.quantity}</Text>
                <Button style={{padding:3}} transparent onPress={() => {
                    this.decrement()
                }} >
                    <Text style={{ color: 'blue', fontSize: 25,fontWeight:'bold' }}>
                        -</Text>
                </Button>
            </View>
        )
    }
}
export default ButtonCustom