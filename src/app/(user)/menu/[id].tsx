import { View, Text, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import products from '@/src/constants/data/products';
import { DeafultImage } from '@/src/components/ProductItem';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/constants/types';
import { useProduct } from '@/src/hooks/useProducts';
import RemoteImage from '@/src/components/RemoteImgae';

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useLocalSearchParams();
  const [select, setSelect] = useState<PizzaSize>('M');
  
  const { data: product, error, isLoading } = useProduct(Number(id));
  
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

  const addItems = () => {
    if (!product) return;
    addToCart(product, select);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Falied to get load data!</Text>;
  }
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: product?.name,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <View className="p-5">
      <RemoteImage
          className="aspect-square w-[100%] "
          path={product?.image!}
          fallback={DeafultImage}
        />
      </View>
      <View className="flex-1 px-4 pt-7">
        <Text className="font-[Poppins-Regular] text-lg">Select Size:</Text>
        <View className="flex-row justify-around py-3 ">
          {sizes.map((size) => (
            <Pressable
              className={`aspect-square w-16 items-center justify-center rounded-full ${select === size ? 'bg-gray-200' : ''}`}
              key={size}
              onPress={() => {
                setSelect(size);
              }}>
              <Text
                className={`text-2xl ${select === size ? 'font-bold text-black' : 'font-semibold text-gray-500'} `}>
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="flex-1 justify-end gap-3 px-4 pb-7">
        <Text className="text-xl font-bold">Price: ${product?.price}</Text>
        <TouchableOpacity
          className="w-full items-center rounded-3xl bg-[#016492] py-3"
          onPress={addItems}>
          <Text className="text-bold text-lg text-white">Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
