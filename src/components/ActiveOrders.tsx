import { View, Text, FlatList } from 'react-native';
import React from 'react';
import orders from '../constants/data/orders';
import OrderListItem from './OrderListItem';

const ActiveOrders = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}
    />
  );
};

export default ActiveOrders;
