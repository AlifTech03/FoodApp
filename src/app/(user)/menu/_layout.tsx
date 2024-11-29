import { View, Pressable } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { TabBarIcon } from '@/src/components/TabBarIcon';
import { supabase } from '@/src/utils/supabase';
import { AntDesign } from '@expo/vector-icons';

const MenuLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <View className='flex-row gap-4'>

          <Pressable onPress={async () => await supabase.auth.signOut()}>
          <AntDesign name="logout" size={20} color="black" />
          </Pressable>
          <Link href={'/cart'}>
            <TabBarIcon color="#016492" name="shopping-cart" />
          </Link>
          </View>
        ),
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Menu',
        }}
      />
    </Stack>
  );
};

export default MenuLayout;
