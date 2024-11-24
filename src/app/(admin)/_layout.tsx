import { Redirect, Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuth } from '@/src/providers/AuthProvider';

export default function TabLayout() {
  const { profile} = useAuth()
  
  if (!profile || profile.role !== 'ADMIN') {
    return <Redirect href="/" />;
  }
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
