import * as React from 'react'

import { ListItem, Avatar, Button } from 'react-native-elements'

import { useAppDispatch } from '../store'

import { Product } from '../store/product'
import { addToCart } from '../store/cart'

export interface ProductItemProps {
  product: Product
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch()

  const onButtonPress = () => {
    dispatch(addToCart(product))
  }

  return (
    <ListItem bottomDivider>
      <Avatar size="medium" source={{ uri: product.image }} />
      <ListItem.Content>
        <ListItem.Title>{product.title}</ListItem.Title>
        <ListItem.Subtitle>$ {product.price.toFixed(2)}</ListItem.Subtitle>
      </ListItem.Content>
      <Button icon={{ name: 'cart-plus', type: 'font-awesome-5', color: 'white' }} onPress={onButtonPress} />
    </ListItem>
  )
}
