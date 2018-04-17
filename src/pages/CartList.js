import React from "react";
import {
  View,
  TextInput,
  Alert,
  Image,
  AsyncStorage,
  ScrollView
} from "react-native";
import {
  Text,
  Header,
  Button,
  Toast,
  Thumbnail,
  ListItem,
  List,
  Body,
  Right,
  Left,
  Icon,
  Item,
  Input
} from "native-base";
import { StackNavigator } from "react-navigation";
import ButtonCustom from "../components/ButtonCustom";
export default class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        item : this.props.item,
        quantity: 0,
    }
  }

  setQuantity(qty){
    this.setState({
        quantity: qty
    }),
    this.props.getSubTotal(qty*this.props.item.price)
  }
  render() {
    let {item,quantity} = this.state
    return (
      <List >
        <ListItem
          onLongPress={() => {
            Alert.alert(
              "Confirm",
              "Delete item",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
          }}
        >
          <Right>
            <Item>
              <Input
                placeholder="qty?"
                onChangeText={qty => this.setQuantity(qty)}
                
              />
            </Item>
          </Right>
          <Body>
            <Text>{item.name}</Text>
            <Text note color={"black"}>
              ${item.price}
            </Text>
            <Text note>Sub Total : {quantity * item.price}</Text>
          </Body>
        </ListItem>
      </List>
    );
  }
}
