import { View, Text } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';

const AuthLayout = () => {
  const {session} = useAuth()
  if(session) {
    return <Redirect href={'/'}/>
  }
  return (
    <Stack
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AuthLayout;
