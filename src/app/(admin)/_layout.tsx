import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#016492"
        },
        tabBarActiveTintColor: 'white',  
        tabBarInactiveTintColor: "gray" 
        
      }}>
      <Tabs.Screen name="index" redirect />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown:false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="cutlery" color={focused? "white": "gray"} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',  
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="list" color={focused? "white": "gray"} />,
        }}
      />
    </Tabs>
  );
}
