import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tables } from '../database.types';
import { DeafultImage } from './ProductItem';
import RemoteImage from './RemoteImgae';

type orderItemProps = {
  orderItem: Tables<'order_item'> & { products: Tables<'products'> | null };
};

const OrderItemListItem = ({ orderItem }: orderItemProps) => {
  if (!orderItem.products) {
    return <Text> There is something worng! </Text>;
  }
  return (
    <View className="flex-row items-center justify-center rounded-lg bg-white  p-3 shadow-sm shadow-black">
      <View className="flex-1 flex-row items-center gap-3">
        <RemoteImage
          className="aspect-square w-20 rounded-full"
          path={orderItem.products.image!}
          fallback={ DeafultImage }
          resizeMode="cover"
        />
        <View>
          <Text className="text-xl font-bold">{orderItem.products.name}</Text>
          <View className="mt-2 flex-row gap-3">
            <Text className="text-lg font-bold text-blue-900">${orderItem.products.price}</Text>
            <Text className="text-lg font-semibold">Size: {orderItem.size}</Text>
          </View>
        </View>
      </View>
      <Text className="text-xl font-bold">{orderItem.quantity}</Text>
    </View>
  );
};

export default OrderItemListItem;
