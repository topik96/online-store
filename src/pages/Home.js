import React, { Component } from 'react'
import {
    Platform, StyleSheet, View, AppRegistry, ActivityIndicator, TextInput, Alert, ScrollView, AsyncStorage
} from 'react-native'
import { Container, Header, Footer, Icon, Button, Content, Tab, Tabs, Item, Input, Text } from 'native-base'
import { PricingCard } from 'react-native-elements'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nmPoduct: '', dtProduct: []
        }
    }
    UNSAFE_componentWillMount() {
        this.fetchData().done()
    }
    async fetchData() {
        let response = await fetch('https://private-5b737-tokoonline2.apiary-mock.com/show_products')
        let json = await response.json()
        let data = json
        this.setState({
            dtProduct: data
        })
    }
    setText(key, str) {
        this.setState({
            [key]: str
        })
    }
    showProduct() {
        if (this.state.dtProduct.length === 0) {
            return <ActivityIndicator size="large" />
        } else {
            return this.state.dtProduct.map(product => {
                if (product.name.toLowerCase().includes(this.state.nmPoduct.toLowerCase())) {
                    return <PricingCard
                        color='#4f9deb'
                        title={product.name}
                        price={product.price}
                        info={[product.description]}
                        button={{ title: 'Add to cart' }}
                    />
                }
            })
        }
    }
    render() {
        return (
            <View>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={nm => {
                            this.setState({ nmPoduct: nm })
                        }} />
                    </Item>
                </Header>
                <ScrollView>
                    {this.showProduct()}
                    <Button bordered onPress={() => {
                        this.props.navigation.navigate('Login')
                        AsyncStorage.removeItem('Login')
                    }}>
                        <Text>Logout</Text>
                    </Button>
                </ScrollView>
            </View>
        )
    }
}
export default Home