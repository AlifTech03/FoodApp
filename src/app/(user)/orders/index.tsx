import OrderListItem from '@/src/components/OrderListItem';
import orders from '@/src/constants/data/orders';
import { useMyorder } from '@/src/hooks/useOrders';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';

export default function Home() {
  const {data: orders, error, isLoading} = useMyorder()
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Falied to get load data!</Text>;
  }
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
