import ActiveOrders from '@/src/components/ActiveOrders';
import ArchieveOrders from '@/src/components/ArchieveOrders';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default function Home() {

  const renderScene = SceneMap({
    ActiveOrders,
    ArchieveOrders,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'ActiveOrders', title: 'Active' },
    { key: 'ArchieveOrders', title: 'Archieve' },
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
