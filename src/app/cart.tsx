import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider'
import { FlatList } from 'react-native-gesture-handler'
import CartListItem from '../components/CartListItem'
import { Button } from '../components/Button'
import { router } from 'expo-router'

const CartScreen = () => {
  const {items, total} = useCart()
  return (
    <View style={{
      padding:7
    }}>
      <FlatList
        data={items}
        renderItem={({item})=> (
          <CartListItem
            cartItem = {item}
          />
        )}
        ListEmptyComponent={()=> (
          <View className='flex-1 min-h-[85vh] items-center justify-center'>
            <Text className='text-xl font-bold'> No items added yet ...</Text>
            <Button
              title='Go Home'
              onPress={()=> router.navigate('/(user)/menu/')}
            />
          </View>
        )}
        contentContainerStyle={{
          gap: 7
        }}
      />
      <Text className='font-bold text-lg'>Total: $<Text className='text-xl'>{total}</Text></Text>
      <Button
        title='Checkout'
        className='mt-3'
      />
      <StatusBar style={Platform.OS === 'android' || "ios" ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})