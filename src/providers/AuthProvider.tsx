import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

type AuthData = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setLoading(false);
      } catch (error) {
        throw new Error(error as string);
      }
    };
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    fetchSession();
  }, []);

  console.log({session});
  
  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
