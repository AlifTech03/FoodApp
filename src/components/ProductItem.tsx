import { Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Tables } from '../database.types';

type ProductItemProp = {
  product: Tables<'products'>;
};

export const DeafultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable className="max-w-[50%] flex-1 rounded-lg bg-white p-4">
        <Image
          className="aspect-square w-full"
          source={{
            uri: product.image || DeafultImage,
          }}
          resizeMode="contain"
        />
        <View className="pt-3 gap-2">
          <Text className="flex-1 font-bold text-xl">{product.name}</Text>
          <Text className="font-bold text-blue-500">{`$ ${product.price}`}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default ProductItem;
