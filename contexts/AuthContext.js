"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile from database
    const fetchProfile = async (userId) => {
        if (!supabase || !userId) return null;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                return null;
            }

            return data;
        } catch (err) {
            console.error('Error fetching profile:', err);
            return null;
        }
    };

    useEffect(() => {
        // Check active session
        if (!supabase) {
            setLoading(false);
            return;
        }

        // Helper function to sync session to cookies for middleware
        const syncSessionToCookies = (session) => {
            if (session?.access_token) {
                // Set cookie with access token for middleware
                document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            } else {
                // Clear cookie on logout
                document.cookie = 'sb-access-token=; path=/; max-age=0';
            }
        };

        supabase.auth.getSession().then(async ({ data: { session } }) => {
            // Sync session to cookies for middleware
            syncSessionToCookies(session);

            if (session?.user) {
                const userData = {
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
                    avatar: session.user.user_metadata?.avatar,
                    // Admin check will be done after fetching profile
                    isAdmin: false
                };
                setUser(userData);

                // Fetch profile with role
                const profileData = await fetchProfile(session.user.id);
                setProfile(profileData);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            // Sync session to cookies for middleware
            syncSessionToCookies(session);

            if (session?.user) {
                const userData = {
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
                    avatar: session.user.user_metadata?.avatar,
                    // Admin check will be done after fetching profile
                    isAdmin: false
                };
                setUser(userData);

                // Fetch profile with role
                const profileData = await fetchProfile(session.user.id);
                setProfile(profileData);
            } else {
                setUser(null);
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const register = async (email, password, name) => {
        if (!supabase) {
            return { success: false, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name || email.split('@')[0]
                    }
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const login = async (email, password) => {
        if (!supabase) {
            return { success: false, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const logout = async () => {
        if (!supabase) return;

        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    // Refresh profile data (call this after onboarding completion)
    const refreshProfile = async () => {
        if (user?.id) {
            const profileData = await fetchProfile(user.id);
            setProfile(profileData);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            login,
            register,
            logout,
            refreshProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;
