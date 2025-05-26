'use client';

import { useState, useEffect, useCallback } from 'react';
import {userSession} from "@/app/_lib/actions/Authentication/action";

export function useAuthClient() {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const checkSession = useCallback(async () => {
        setLoading(true);
        const res = await userSession();
        if (res?.userId) {
            setUser(res.userId);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    return { user, loading, isAuthenticated: !!user, checkSession, setUser };
}

