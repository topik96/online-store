import React, { Component } from 'react';
import Style from './style/style'
import { Container, Header, Button, Footer,Icon, Content, Tab, Tabs, Item, Input, Text } from 'native-base'
import TabProducts from './Home'
import TabCart from './Cart'
import TabProfile from './Profile'

class TabView extends Component {
  render() {
    console.log('ini tab ',this.props.navigation)
    return (
      <Container>
        <Tabs initialPage={0} tabBarPosition="overlayBottom">
          <Tab heading="Products">
            <TabProducts navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Cart">
            <TabCart navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Profile">
            <TabProfile navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container >

    )
  }
}


export default TabView
