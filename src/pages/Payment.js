import React, { Component } from 'react';
import { WebView, View, ActivityIndicator, Alert, Text } from 'react-native';

export default class Payment extends Component {
    render() {
        const url = this.props.navigation.state.params.toString()
        return (
            <WebView
                source={{ uri: url }}
            />
        )
    }
}