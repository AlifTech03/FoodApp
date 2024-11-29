import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { useOrderDetails } from '@/src/hooks/useOrders';

dayjs.extend(relativeTime);

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const {data: order, error, isLoading} = useOrderDetails(parseInt(typeof id === 'string' ? id : id[0]))

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Falied to get load data!</Text>;
  }

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
        data={order?.order_item}
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
