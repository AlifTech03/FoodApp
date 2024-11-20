import OrderListItem from '@/src/components/OrderListItem';
import orders from '@/src/constants/data/orders';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default function Home() {
  const Active = () => (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}
    />
  );
  const Archieve = () => (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}
    />
  );

  const renderScene = SceneMap({
    Active,
    Archieve,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Active', title: 'Active' },
    { key: 'Archieve', title: 'Archieve' },
  ]);

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <TabView
        lazy
        lazyPreloadDistance={1000}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: 'white',
            }}
            indicatorStyle={{
              backgroundColor: '#016492',
            }}
            labelStyle={{
              color: 'black',
            }}
            activeColor="black"
            inactiveColor="gray"
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
