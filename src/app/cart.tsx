import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../providers/CartProvider';
import { FlatList } from 'react-native-gesture-handler';
import CartListItem from '../components/CartListItem';
import { Button } from '../components/Button';
import { Link, router } from 'expo-router';

const CartScreen = () => {
  const { items, total, checkOrder } = useCart();
  return (
    <View
      style={{
        padding: 7,
      }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={() => (
          items.length > 0 &&  <View>
            <Text className="text-lg font-bold">
              Total: $<Text className="text-xl">{total}</Text>
            </Text>
            <Link href={`/(user)/orders/`} asChild>
              <Button title="Checkout" className="mt-3" onPress={checkOrder} />
            </Link>
          </View>
        )}
        ListEmptyComponent={() =>
          (
            <View className="min-h-[85vh] flex-1 items-center justify-center">
              <Text className="text-xl font-bold"> No items added yet ...</Text>
              <Button title="Go Home" onPress={() => router.replace('/(user)/menu')} />
            </View>
          )
        }
        contentContainerStyle={{
          gap: 7,
        }}
      />

      <StatusBar style={Platform.OS === 'android' || 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
