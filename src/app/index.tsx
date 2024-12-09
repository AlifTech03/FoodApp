import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { Button } from '../components/Button';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../utils/supabase';

const index = () => {
  const { loading, session, profile } = useAuth();
  
  if (loading && !profile) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }
  if (profile?.role === 'ADMIN') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10, gap: 5 }}>
        <Link href={'./(user)/menu/'} asChild>
          <Button title="User" />
        </Link>
        <Link href={'./(admin)/menu/'} asChild>
          <Button title="Admin" />
        </Link>
        <Button title="Log Out" onPress={async () => await supabase.auth.signOut()} />
      </View>
    );
  }
  return <Redirect href={'/(user)'} />;
};

export default index;
