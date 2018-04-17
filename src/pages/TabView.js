import React, { Component } from 'react';
import Style from './style/style'
import {AsyncStorage} from 'react-native'
import { Container, Header, Button, Footer,Icon, Content, Tab, Tabs, Item, Input, Text } from 'native-base'
import TabProducts from './showProducts'
import TabCart from './Cart'
import TabProfile from './Profile'

export default class TabView extends Component {
  constructor(props){
    super(props)
    this.state={
      items:[]
    }
  }
  
  componentDidMount(){
    this.getItem()
  }

  getItem(){
    AsyncStorage.getItem('itemInCart')
    .then((resData)=>{
        this.setState({
            items: JSON.parse(resData)
        })
    })
  }
  
  render() {
    console.log('get item'+this.state.items)
    // console.log('ini asyn item', this.getItem())//
    return (
      <Container>
        <Tabs initialPage={0} tabBarPosition="overlayBottom" onChangeTab={()=>
          this.getItem()  
          }>
          <Tab heading="Products">
            <TabProducts navigation={this.props.navigation } items={this.state.items}/>
          </Tab>
          <Tab heading="Cart">
            <TabCart navigation={this.props.navigation} items={this.state.items}/>
          </Tab>
          <Tab heading="Profile">
            <TabProfile navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container >

    )
  }
}

