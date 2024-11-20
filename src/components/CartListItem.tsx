import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CartItem } from '../constants/types';
import { DeafultImage } from './ProductItem';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../providers/CartProvider';

type CarListProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CarListProps) => {
  const { updateQuantity } = useCart();
  return (
    <View className="w-full flex-row rounded-lg bg-white p-3">
      <View className="flex-1 flex-row items-center gap-2">
        <Image
          className="aspect-square w-16"
          source={{
            uri: cartItem.product.image || DeafultImage,
          }}
          resizeMode="contain"
        />
        <View className="gap-1">
          <Text className="text-lg font-semibold">{cartItem.product.name}</Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-[#016492]">${cartItem.product.price}</Text>
            <Text className="pt-2 font-[Poppins-Regular]">
              Size: <Text className="font-bold">{cartItem.size}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-around gap-3">
        <Pressable
          className="aspect-square w-7 items-center justify-center rounded-full bg-gray-200"
          onPress={() => updateQuantity(cartItem.id, -1)}>
          <FontAwesome name="minus" size={15} color="black" />
        </Pressable>
        <Text className="text-xl font-bold">{cartItem.quantity}</Text>
        <Pressable
          className="aspect-square w-7 items-center justify-center rounded-full bg-gray-200"
          onPress={() => updateQuantity(cartItem.id, 1)}>
          <FontAwesome name="plus" size={15} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default CartListItem;

const styles = StyleSheet.create({});
