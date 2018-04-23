import React, { Component } from 'react';
import { WebView, View, ActivityIndicator, Alert, Text } from 'react-native';

export default class Payment extends Component {

    render() {
        console.log(JSON.stringify(this.props.navigation.state.params) + '=========================')
        const url = this.props.navigation.state.params.toString()
        return (
            <WebView
                source={{ uri: url }}
                style={{ marginTop: 20 }}
            />
        )
        // if (this.props.navigation.state.params !== undefined) {
        //     return (
        //             
        //     )
        // } else {
        //    console.log('aaaaaaa')
        // }

    }
}