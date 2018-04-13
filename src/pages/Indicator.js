import React from 'react'
import {ActivityIndicator, AsyncStorage} from 'react-native'
export class Indicator extends React.Component{
    componentDidMount(){
    AsyncStorage.getItem('Login')
    .then(result=>{
        if(result===null){
            setTimeout(()=>this.props.navigation.navigate('Login'), 1000) 
        }else{
            setTimeout(()=>this.props.navigation.navigate('TabView'), 1000) 
        } 
    })
    }
    render(){
        return(
           <ActivityIndicator
           size="large"
           />
        )
    }
}
