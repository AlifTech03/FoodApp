import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Order } from '../constants/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'expo-router';
import { Tables } from '../database.types';
type OrderListProps = {
  order: Tables<'orders'>;
};
dayjs.extend(relativeTime);

const OrderListItem = ({ order }: OrderListProps) => {
  return (
    <Link href={`/orders/${order.id}`} asChild>
    <Pressable className="flex-row items-center rounded-lg bg-white p-3">
      <View className="flex-1 gap-2">
        <Text className="text-xl font-bold">Order #{order.id}</Text>
        <Text className="font-semibold text-gray-400">{dayjs(order.created_at).fromNow()}</Text>
      </View>
      <Text className="text-lg font-semibold">{order.status}</Text>
    </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({});
