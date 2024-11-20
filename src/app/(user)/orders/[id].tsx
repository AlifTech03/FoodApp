import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/src/constants/data/orders';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';

dayjs.extend(relativeTime);

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((item) => item.id === Number(id));

  if (!order) {
    return <Text>Not found...</Text>;
  }

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: `Order #${id}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '800',
            fontFamily: 'Pippins-Regular',
          },
        }}
      />

      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponentStyle={{
          paddingBottom:10
        }}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
        }}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
