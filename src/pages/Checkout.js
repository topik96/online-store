import React from 'react'
import {View} from 'react-native'
import {
    ListItem,Thumbnail, Body,List,Content,Text,Button,Right
} from 'native-base'
export default class Checkout extends React.Component{
    render(){
        return(
            <View>
                <List>
                    <ListItem>
                        <Thumbnail square size={80} source={{uri: 'https://www.ishopperu.com.pe/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone_8_plus_gold_1.png'}}/>
                        <Body>
                            <Text>iPhone8</Text>
                            <Text note>Gold, 32GB, 15MegaPixel</Text>
                            <Text note>$999</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>Buy</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </List>
            </View>
        )
    }
}