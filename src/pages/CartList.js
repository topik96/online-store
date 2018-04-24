import React from "react";
import {
  View,
  TextInput,
  Alert,
  Image,
  AsyncStorage,
  ScrollView,
  refreshControl,
  RefreshControl
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

export default class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    }
  }

  setQuantity(qty = 1) {
    this.props.getSubTotal(0)
    this.state.item.quantity = parseInt(qty)
    this.setState({
      item: this.state.item
    })
    this.props.getSubTotal(qty * this.props.item.price)
  }

  render() {
    let { item, quantity } = this.state
    if (this.state.item.id !== undefined) {
      return (
        <List>
          <ListItem
            onPress={() => {
              Alert.alert(
                "Confirm",
                "Delete item",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: "OK", onPress: () => {

                      AsyncStorage.getItem('itemInCart')
                        .then(res => {
                          let data = JSON.parse(res)
                          if (data !== null) {
                            let product = data.filter(it => {
                              return it.id !== item.id
                            })
                            this.setState({
                              item: product
                            })
                            AsyncStorage.setItem('itemInCart', JSON.stringify(product))
                            this.props.getItem()
                          }
                        })
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Right>
              <TextInput
                disable
                style={{ fontSize: 20, marginRight: 30 }}
                onChangeText={(qty) => this.setQuantity(item.quantity)}
                defaultValue={JSON.stringify(item.quantity)}
              />
            </Right>
            <Body>
              <Text>{item.name}</Text>
              <Text note color={"black"}>
                ${item.price}
              </Text>
              <Text note>Sub Total : {item.quantity * item.price}</Text>
            </Body>
          </ListItem>
        </List>
      );
    }
    return (
      <List >

      </List>
    );
  }
}
