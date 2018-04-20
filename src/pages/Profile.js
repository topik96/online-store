import React, { Component } from 'react'
import axios from 'axios'
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
    Button,
    Text,
    Body,
    Right,
    Left,
    Icon
} from 'native-base'
import { AsyncStorage } from 'react-native'
export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            id: 54,
            email:'',
            username: '',
            name: '',
            password: '',
            phone: '',
            address: '',
            disableInput: true
        }
    }
   UNSAFE_componentWillMount() {
        console.log('============================================ID')
        axios.get(`http://192.168.100.29:5000/api/users/${this.state.id}`)
            .then(res => {
                this.setState({
                    username: res.data[0].username,
                    email:res.data[0].email,
                    password: res.data[0].password,
                    phone: res.data[0].phone,
                    address: res.data[0].address
                })
                console.log(res.data[0].password+'========================================')
            })
    }

    putData() {
        axios.put(`http://192.168.100.29:5000/api/users/${this.state.id}/update`, {
            username: this.state.username,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address
        })
        .then(res=>{
            console.log(res)
        })
    }

    editData(dis) {
        if (dis === true) {
            return <Button full danger onPress={() => {
                AsyncStorage.removeItem('totalPaid')
                AsyncStorage.removeItem('idUser')
                AsyncStorage.removeItem('login')
                AsyncStorage.removeItem('itemInCart')
                this.props.navigation.navigate('Login')
            }}>
                <Text>Logout</Text>
            </Button>

        } else {
            return <Button primary block onPress={() => {
                this.putData(this.state.id)
                this.setState({
                    disableInput: true
                })
            }}>
                <Text>Submit</Text>
            </Button>

        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Text>Profile</Text>
                    <Right>
                        <Button transparent onPress={() => {
                            this.setState({
                                disableInput: false
                            })
                        }}>
                            <Text>Edit</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input value="Topikmuj" autoCapitalize='none' disabled={this.state.disableInput} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input defaultValue="Topikmuj" autoCapitalize='none' disabled={this.state.disableInput} value={this.state.username} 
                            onChangeText={(txt)=>{
                                this.setState({
                                    username:txt
                                })
                            }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Email</Label>
                            <Input autoCapitalize='none' disabled={this.state.disableInput} value={this.state.email}
                             onChangeText={(txt)=>{
                                this.setState({
                                email:txt
                                })
                            }}
                            
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry autoCapitalize='none' disabled={this.state.disableInput} value={this.state.password}
                             onChangeText={(txt)=>{
                                this.setState({
                                    password:txt
                                })
                            }}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Phone</Label>
                            <Input keyboardType='numeric' maxLength={13} disabled={this.state.disableInput} value={this.state.phone}
                             onChangeText={(txt)=>{
                                this.setState({
                                    phone:txt
                                })
                            }}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Address</Label>
                            <Input disabled={this.state.disableInput} value={this.state.address} 
                             onChangeText={(txt)=>{
                                this.setState({
                                    address:txt
                                })
                            }}
                            />
                        </Item>
                    </Form>
                </Content>
                {this.editData(this.state.disableInput)}
            </Container>
        )
    }
}