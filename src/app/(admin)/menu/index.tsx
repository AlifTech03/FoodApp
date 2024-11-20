import ProductItem from '@/src/components/ProductItem';
import products from '@/src/constants/data/products';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

export default function Home() {
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
