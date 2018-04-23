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
   this.getItem  = this.getItem.bind(this)
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
        console.log(resData,' INI DATA TAB VIEW')
    })
  }
  
  render() {
    console.log(this.state.items)  
    return (
      <Container>
        <Tabs initialPage={0} tabBarPosition="overlayBottom" onChangeTab={()=>
          this.getItem()  
          }>
          <Tab heading="Products">
            <TabProducts navigation={this.props.navigation } items={this.state.items} getItem={this.getItem}/>
          </Tab>
          <Tab heading="Cart">
            <TabCart navigation={this.props.navigation} items={this.state.items} getItem={this.getItem}/>
          </Tab>
          <Tab heading="Profile">
            <TabProfile navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container >

    )
  }
}

