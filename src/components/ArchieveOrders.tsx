import {  Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import OrderListItem from './OrderListItem';
import { useAdminOrder } from '../hooks/useOrders';

const ArchieveOrders = () => {
  const { data: orders, error, isLoading } = useAdminOrder({ archieve: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Falied to get load data!</Text>;
  }
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

export default ArchieveOrders;
