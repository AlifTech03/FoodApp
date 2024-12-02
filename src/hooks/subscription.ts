import { useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/AuthProvider';

export const useOrerSubscribe = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const channels = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload);
        queryClient.invalidateQueries(['orders']);
      })
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);
};

export const useOrderUpdateSubscribe = (id: number) => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;
  useEffect(() => {
    const channels = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${id}` },
        (payload) => {
          console.log('Change received!', payload);
          queryClient.invalidateQueries(['order', id]);
          queryClient.invalidateQueries(['order', { userId: userId }]);
        }
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);
};
