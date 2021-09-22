import * as React from 'react'

import { ListItem, Avatar, Button } from 'react-native-elements'

import { CartEntry, removeFromCart } from '../store/cart'
import { useAppDispatch } from '../store'

export interface CartItemProps {
  item: CartEntry
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch()

  const onButtonPress = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <ListItem bottomDivider>
      <Avatar size="medium" source={{ uri: item.product.image }} />
      <ListItem.Content>
        <ListItem.Title>{item.product.title}</ListItem.Title>
        <ListItem.Subtitle>$ {item.product.price.toFixed(2)}</ListItem.Subtitle>
      </ListItem.Content>
      <Button icon={{ name: 'remove', type: 'font-awesome', color: 'white' }} onPress={onButtonPress} />
    </ListItem>
  )
}
