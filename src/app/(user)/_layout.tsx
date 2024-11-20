import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',   
      }}>
      <Tabs.Screen name="index" redirect />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={"#016492"} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Order', 
          headerShown:false, 
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={"#016492"} />,
        }}
      />
    </Tabs>
  );
}
