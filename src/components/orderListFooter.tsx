import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Tables } from '../database.types';
import { OrderStatusList } from '../constants/types';
import { useUpdateOrder } from '../hooks/useOrders';
type OrderListFooterProps = {
  order: Tables<'orders'>;
};
const OrderListFooter = ({ order }: OrderListFooterProps) => {
  const { mutate: updateStatus } = useUpdateOrder();
  return (
    <View className="mt-5 flex-row">
      {OrderStatusList.map((item) => (
        <Pressable
          key={item}
          className={`mx-2 items-center justify-center rounded-lg border border-blue-900 px-3 py-1 ${item === order.status ? 'bg-blue-900' : null}`}
          onPress={() => {
            updateStatus({ id: order.id, status: item });
          }}>
          <Text
            className={`font-[Poppins-Regular] ${item === order.status ? 'text-white' : 'text-blue-900'}`}>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default OrderListFooter;
