import { Redirect, Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuth } from '@/src/providers/AuthProvider';

export default function TabLayout() {
  const {session} = useAuth()
  if(!session) {
    return <Redirect href={'/(auth)/sign-in'}/>
  }
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
