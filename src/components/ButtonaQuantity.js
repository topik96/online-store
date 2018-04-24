import React, { Component } from 'React'
import { Button, Left, Right, Body,Icon,Content } from 'native-base'
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
            <Content>
                <Button transparent onPress={() => {
                    this.increment()
                }}>
                    <Icon name="md-arrow-dropup"/>
                </Button>
                <Text style={{ fontSize: 15,paddingLeft:17 }}>{this.state.quantity}</Text>
                <Button transparent onPress={() => {
                    this.decrement()
                }} >
                    <Icon name="md-arrow-dropdown"/>
                </Button>
            </Content>
        )
    }
}
export default ButtonCustom