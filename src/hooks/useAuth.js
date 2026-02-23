import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const ALLOWED_DOMAINS = ['thearcstudio.com', 'boldxenterprises.com'];

export function useAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        const domain = session.user.email.split('@')[1]?.toLowerCase();
        if (!ALLOWED_DOMAINS.includes(domain)) {
          supabase.auth.signOut();
          setAuthError('Access restricted to authorized company domains.');
          setSession(null);
          setUser(null);
          setLoading(false);
          return;
        }
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateDomain = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return ALLOWED_DOMAINS.includes(domain);
  };

  const signUp = useCallback(async (email, password, firstName, lastName) => {
    setAuthError('');
    setAuthMessage('');
    if (!validateDomain(email)) {
      setAuthError('Registration is restricted to authorized domains.');
      return false;
    }
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) { setAuthError(error.message); return false; }
    if (data?.user?.identities?.length === 0) {
      setAuthError('An account with this email already exists.');
      return false;
    }
    setAuthMessage('Check your email for a verification link! Once verified, you can log in.');
    return true;
  }, []);

  const signIn = useCallback(async (email, password) => {
    setAuthError('');
    setAuthMessage('');
    if (!validateDomain(email)) {
      setAuthError('Access is restricted to authorized domains.');
      return false;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setAuthError('Please verify your email before logging in. Check your inbox.');
      } else {
        setAuthError('Invalid email or password.');
      }
      return false;
    }
    return true;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const resetPassword = useCallback(async (email) => {
    setAuthError('');
    setAuthMessage('');
    if (!validateDomain(email)) {
      setAuthError('Password reset is restricted to authorized domains.');
      return false;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}`,
    });
    if (error) { setAuthError(error.message); return false; }
    setAuthMessage('Password reset link sent! Check your email inbox.');
    return true;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError('');
    setAuthMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: { hd: 'thearcstudio.com boldxenterprises.com' },
      },
    });
    if (error) { setAuthError(error.message); return false; }
    return true;
  }, []);

  return {
    user, session, loading, authError, authMessage,
    setAuthError, setAuthMessage,
    signUp, signIn, signOut, signInWithGoogle, resetPassword, validateDomain,
  };
}
