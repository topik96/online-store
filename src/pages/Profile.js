import React from 'react'
import { AsyncStorage } from 'react-native'
import {
    View, Alert
} from 'react-native'
import {
    Container, Header, Footer, Icon, Right, Button, Content, Tab, Tabs, Item, Input, Text, List, ListItem
} from 'native-base'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }
    // componentDidMount() {
    //     this.setState({
    //         name: 'Topik Mujianto'
    //     })
    // }
    // fetchData() {
    //     let response = await fetch('')
    //     let json = await response.json()

    // }
    render() {
        return (
            <View>
                <Header>
                    <Right>
                        <Button transparent onPress={() => {
                            
                        }}>
                            <Text>Edit</Text>
                        </Button>
                    </Right>

                </Header>
                <List>
                    <ListItem>
                        <Text>Name </Text>
                        <Right><Text>Mujianto</Text></Right>
                    </ListItem>
                    <ListItem>
                        <Text>Mail </Text>
                    </ListItem>
                    <ListItem>
                        <Text>Phone </Text>
                    </ListItem>
                    <ListItem>
                        <Text>Address </Text>
                    </ListItem>
                    
                        <Button block danger onPress={() => {
                            this.props.navigation.navigate('Login')
                            AsyncStorage.removeItem('Login')
                        }}>
                            <Text>Sign Out</Text>
                        </Button>
                    
                </List>

            </View>

        )
    }
}
//username password email address phone 
export default Profile