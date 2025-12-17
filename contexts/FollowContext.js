"use client";

import { useState, createContext, useContext, useEffect } from 'react';

// Follow Context
const FollowContext = createContext(null);

export function FollowProvider({ children }) {
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        // localStorage'dan yükle
        const saved = localStorage.getItem('avorahub_following');
        if (saved) {
            setFollowing(JSON.parse(saved));
        }
    }, []);

    const follow = (entityType, entityId, entityName) => {
        const newFollow = { type: entityType, id: entityId, name: entityName, date: new Date().toISOString() };
        const updated = [...following, newFollow];
        setFollowing(updated);
        localStorage.setItem('avorahub_following', JSON.stringify(updated));
    };

    const unfollow = (entityType, entityId) => {
        const updated = following.filter(f => !(f.type === entityType && f.id === entityId));
        setFollowing(updated);
        localStorage.setItem('avorahub_following', JSON.stringify(updated));
    };

    const isFollowing = (entityType, entityId) => {
        return following.some(f => f.type === entityType && f.id === entityId);
    };

    const getFollowCount = (entityType) => {
        return following.filter(f => f.type === entityType).length;
    };

    return (
        <FollowContext.Provider value={{
            following,
            followers,
            follow,
            unfollow,
            isFollowing,
            getFollowCount
        }}>
            {children}
        </FollowContext.Provider>
    );
}

export function useFollow() {
    const context = useContext(FollowContext);
    if (!context) {
        throw new Error('useFollow must be used within a FollowProvider');
    }
    return context;
}

export default FollowProvider;
