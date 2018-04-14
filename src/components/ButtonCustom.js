import React,{Component} from 'React'
import {Button} from 'native-base'
import {View, Text} from 'react-native'
export default class ButtonCustom extends Component{
    constructor(props){
        super(props)
        this.state={
            quantity:this.props.quantity
        }
    }
    increment(){
        this.setState({
            quantity:this.state.quantity+1
        })
    }

    decrement(){
        this.setState({
            quantity:this.state.quantity-1
        })
    }

    render(){
        return(
            <View>
                <Button transparent onPress={()=>this.increment()}>
                    <Text style={{color:'blue',fontSize:15}}>
                        +
                    </Text>
                </Button>
                <Text>1</Text>
                <Button transparent onPress={()=>this.decrement()}>
                    <Text style={{color:'blue'}}>
                        -
                    </Text>
                </Button>
            </View>
        )
    }
}
