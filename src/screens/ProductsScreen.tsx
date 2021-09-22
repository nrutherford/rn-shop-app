import * as React from 'react'

import { useSelector } from 'react-redux'
import { Button, Card } from 'react-native-elements'

import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ProductItem } from '../components'
import { RootState, useAppDispatch } from '../store'
import { fetchProducts } from '../store/product'
import { selectTotal, totalSelector } from '../store/cart'
import { RootStackParamList } from '../types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginBottom: 10,
  },
})

type ProductsScreenProps = NativeStackScreenProps<RootStackParamList, 'Products'>

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  const cartItemsCount = useSelector(selectTotal)
  const cartTotal = useSelector(totalSelector)

  const { products, isLoading } = useSelector((state: RootState) => state.products)

  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Choose>
        <When condition={isLoading}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
            <ActivityIndicator size="large" />
          </View>
        </When>
        <When condition={!products || products.length === 0}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>No Products!</Text>
          </View>
        </When>
        <Otherwise>
          <If condition={cartItemsCount > 0}>
            <Card containerStyle={{ marginBottom: 5 }}>
              <Card.Title>
                {cartItemsCount} item(s) in cart totaling $ {cartTotal.toFixed(2)}
              </Card.Title>
              <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
            </Card>
          </If>
          <FlatList data={products} renderItem={({ item }) => <ProductItem product={item} />} />
        </Otherwise>
      </Choose>
    </View>
  )
}
