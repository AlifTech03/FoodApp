import { View, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { DeafultImage } from '@/src/components/ProductItem';
import { TabBarIcon } from '@/src/components/TabBarIcon';
import { useProduct } from '@/src/hooks/useProducts';
import RemoteImage from '@/src/components/RemoteImgae';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: product, error, isLoading } = useProduct(parseInt(typeof id === 'string' ? id : id[0]));

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
          headerRight: () => (
            <Link
              href={{
                pathname: `./create`,
                params: {
                  id
                },
              }}>
              <TabBarIcon color="#016492" name="pencil" />
            </Link>
          ),
        }}
      />
      <View className="p-5">
        <RemoteImage
          className="aspect-square w-[100%] "
          path={product?.image!}
          fallback={DeafultImage}
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
