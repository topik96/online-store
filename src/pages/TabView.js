import React, { Component } from 'react';
import Style from './style/style'
import {AsyncStorage} from 'react-native'
import { Container, Header, Button, Footer,Icon, Content, Tab, Tabs, Item, Input, Text } from 'native-base'
import TabProducts from './Home'
import TabCart from './Cart'
import TabProfile from './Profile'

export default class TabView extends Component {
  constructor(props){
    super(props)
    this.state={
      items:[]
    }
  }
  

  getItem(){
    AsyncStorage.getItem('item')
    .then((res)=>{
        this.setState({
            items: JSON.parse(res)
        })
    })
  }

  render() {
    console.log('ini tab ',this.props.navigation)
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

