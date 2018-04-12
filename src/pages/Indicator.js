import React from 'react'
import {ActivityIndicator, AsyncStorage} from 'react-native'
class Indicator extends React.Component{
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
        console.log('coba')
        return(
           <ActivityIndicator
           size="large"
           />
        )
    }
}
export default Indicator