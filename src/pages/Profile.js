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
import { AsyncStorage, ActivityIndicator } from 'react-native'
export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            email: '',
            username: '',
            name: '',
            password: '',
            phone: '',
            address: '',
            disableInput: true,
            timePassed: false
        }

    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    componentWillMount() {
        AsyncStorage.getItem('idUser')
            .then(res => {
                console.log(res,'IBEJPHJVOBIVHIOHVHJOHIHVJHOHVJOHUVHJVHIUOIVJGHIUVHJGVIUVHJ G')
                axios.get(`http://192.168.100.10:3000/api/users/?id=${res}`)
                    .then(res => {
                        this.setState({
                            id:res.data[0].id,
                            username: res.data[0].username,
                            email: res.data[0].email,
                            password: res.data[0].password,
                            phone: res.data[0].phone,
                            address: res.data[0].address
                        })
                    })
            })
            setTimeout(() => {
                this.setTimePassed();
            }, 1000);
    }

    putData() {
        axios.put(`http://192.168.100.10:3000/api/users/${this.state.id}`, {
            username: this.state.username,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address
        })
            .then(e=> {
                console.log(e)
            })
    }

    editData(dis) {
        if (dis === true) {
            return <Button style={{ padding: 20 }} block danger onPress={() => {
                AsyncStorage.removeItem('totalPaid')
                AsyncStorage.removeItem('idUser')
                AsyncStorage.removeItem('login')
                this.props.navigation.navigate('Login')
            }}>
                <Text>Logout</Text>
            </Button>
        } else {
            return <Button style={{ padding: 20 }} primary block onPress={() => {
                this.putData()
                this.setState({
                    disableInput: true
                })
            }}>
                <Text>Submit</Text>
            </Button>
        }
    }

    render() {
        if (!this.state.timePassed) {
            return <Container>
                <Header>
                    <Body >

                    </Body>
                    <Text style={{ marginRight: 10, marginTop: 15 }}>Profile</Text>
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
                <ActivityIndicator style={{ marginTop: 250 }} size='large' />;
                 </Container>
        } else {
            return (
                <Container>
                    <Header>
                        <Body >

                        </Body>
                        <Text style={{ marginRight: 10, marginTop: 15 }}>Profile</Text>
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
                        <Form style={{ padding: 20 }}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input value="Topikmuj" autoCapitalize='none' disabled={this.state.disableInput} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input defaultValue="Topikmuj" autoCapitalize='none' disabled={this.state.disableInput} value={this.state.username}
                                    onChangeText={(txt) => {
                                        this.setState({
                                            username: txt
                                        })
                                    }} />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Email</Label>
                                <Input autoCapitalize='none' disabled={true} value={this.state.email}
                                    onChangeText={(txt) => {
                                        this.setState({
                                            email: txt
                                        })
                                    }}

                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input secureTextEntry autoCapitalize='none' disabled={this.state.disableInput} value={this.state.password}
                                    onChangeText={(txt) => {
                                        this.setState({
                                            password: txt
                                        })
                                    }}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Phone</Label>
                                <Input keyboardType='numeric' maxLength={13} disabled={this.state.disableInput} value={this.state.phone}
                                    onChangeText={(txt) => {
                                        this.setState({
                                            phone: txt
                                        })
                                    }}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Address</Label>
                                <Input disabled={this.state.disableInput} value={this.state.address}
                                    onChangeText={(txt) => {
                                        this.setState({
                                            address: txt
                                        })
                                    }}
                                />
                            </Item>
                            <Text></Text>
                            {this.editData(this.state.disableInput)}
                        </Form>
                    </Content>
                </Container>
            )
        }
    }
}