import OrderListItem from '@/src/components/OrderListItem';
import { ScreenContent } from '@/src/components/ScreenContent';
import orders from '@/src/constants/data/orders';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

export default function Home() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Order List',
          headerTitleAlign: 'center',
        }}
      />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
