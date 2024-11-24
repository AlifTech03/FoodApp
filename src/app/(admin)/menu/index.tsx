import ProductItem from '@/src/components/ProductItem';
import { useProductList } from '@/src/hooks/useProducts';
import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';

export default function Home() {
  const {
    data: products,
    error,
    isLoading,
  } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Falied to get load data!</Text>;
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item})=> (
          <ProductItem product = {item}/>
        )}
        numColumns={2}
        contentContainerStyle={{
          padding:10,
          gap:10
        }}
        columnWrapperStyle={{
          gap:10
        }}
        keyExtractor={(item) => (`${item.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
