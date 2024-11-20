import { View, Text } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { TabBarIcon } from '@/src/components/TabBarIcon';

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Menu',
          headerRight: () => (
            <Link href={"./menu/create"}>
              <TabBarIcon color="#016492" name="plus-square-o" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
      />
    </Stack>
  );
};

export default MenuLayout;
