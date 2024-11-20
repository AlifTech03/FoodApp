import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/src/constants/data/orders';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { OrderStatus, OrderStatusList } from '@/src/constants/types';

dayjs.extend(relativeTime);

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((item) => item.id.toString() === id);
  const [selectStatus, setSelectStatus] = useState(order?.status);

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
        ListFooterComponent={() => (
          <View className="mt-5 flex-row">
            {OrderStatusList.map((item) => (
              <Pressable
                key={item}
                className={`mx-2 items-center justify-center rounded-lg border border-blue-900 px-3 py-1 ${item===selectStatus? "bg-blue-900": null}`}
                onPress={() => setSelectStatus(item)}>
                <Text className={`font-[Poppins-Regular] ${item===selectStatus? "text-white": "text-blue-900"}`}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponentStyle={{
          paddingBottom: 10,
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
