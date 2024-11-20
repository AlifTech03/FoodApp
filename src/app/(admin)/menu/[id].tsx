import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import products from '@/src/constants/data/products';
import { DeafultImage } from '@/src/components/ProductItem';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/constants/types';
import { TabBarIcon } from '@/src/components/TabBarIcon';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((product) => product.id.toString() === id);

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: product?.name,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
          },
          headerRight: () => (
            <Link
              href={{
                pathname: `./create`,
                params: {
                  id,
                  name: product?.name,
                  price: product?.price,
                  image: product?.image,
                },
              }}>
              <TabBarIcon color="#016492" name="pencil" />
            </Link>
          ),
        }}
      />
      <View className="p-5">
        <Image
          className="aspect-square w-[100%] "
          source={{
            uri: product?.image || DeafultImage,
          }}
        />
      </View>
      <View className="gap-3 px-4 pb-7">
        <Text className="text-xl font-bold">{product?.name}</Text>
        <Text className="text-lg font-semibold">Price: ${product?.price}</Text>
      </View>
    </View>
  );
};

export default ProductDetails;
