import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
        if (session) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();  
          setProfile(data);
        }
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);


  return <AuthContext.Provider value={{ session, loading, profile}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
