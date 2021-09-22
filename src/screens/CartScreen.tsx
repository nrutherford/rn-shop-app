import * as React from 'react'

import { useSelector } from 'react-redux'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { CartItem } from '../components'
import { useAppDispatch } from '../store'
import { clearCart, selectAll } from '../store/cart'
import { RootStackParamList } from '../types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMessage: {
    fontSize: 16,
  },
})

type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const cartItems = useSelector(selectAll)

  const onButtonPress = () => {
    dispatch(clearCart())
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Choose>
        <When condition={!cartItems || cartItems.length === 0}>
          <View style={styles.centeredContainer}>
            <Text style={styles.userMessage}>Empty Cart</Text>
          </View>
        </When>
        <Otherwise>
          <FlatList data={cartItems} renderItem={({ item }) => <CartItem item={item} />} />
          <Button title="BUY" onPress={onButtonPress} />
        </Otherwise>
      </Choose>
    </View>
  )
}
