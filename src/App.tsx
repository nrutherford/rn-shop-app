import * as React from 'react'

import { ThemeProvider } from 'react-native-elements'
import { Provider as StoreProvider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import store from './store'

import { CartScreen, ProductsScreen } from './screens'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator initialRouteName="Products">
              <Stack.Screen name="Products" component={ProductsScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
