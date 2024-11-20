import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Button } from '../components/Button';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10, gap:5 }}>
      <Link href={'./(auth)/sign-in'} asChild>
        <Button title="Sign-In" />
      </Link>
      <Link href={'./(user)/menu/'} asChild>
        <Button title="User" />
      </Link>
      <Link href={'./(admin)/menu/'} asChild>
        <Button title="Admin" />
      </Link>
    </View>
  );
};

export default index;