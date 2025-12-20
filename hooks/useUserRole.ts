import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export type UserRole = 'entrepreneur' | 'investor' | null;

export interface UserProfile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: UserRole;
    bio: string | null;
    company: string | null;
    website: string | null;
    linkedin: string | null;
    created_at: string;
    updated_at: string;
}

export function useUserRole() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    if (error.code !== 'PGRST116') {
                        // PGRST116 = no rows returned (expected for new users)
                        console.error('Error fetching profile:', error);
                    }
                    setProfile(null);
                } else {
                    setProfile(data);
                }
            } catch (err) {
                console.error('Error in fetchProfile:', err);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const refreshProfile = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(data);
        } catch (error) {
            console.error('Error refreshing profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        role: profile?.role || null,
        isEntrepreneur: profile?.role === 'entrepreneur',
        isInvestor: profile?.role === 'investor',
        hasProfile: !!profile,
        loading,
        refreshProfile,
    };
}
