import { View, Text } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { TabBarIcon } from '@/src/components/TabBarIcon';
import { supabase } from '@/src/utils/supabase';
import { Button } from '@/src/components/Button';

const MenuLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href={'/cart'}>
            <TabBarIcon color="#016492" name="shopping-cart" />
          </Link>
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
