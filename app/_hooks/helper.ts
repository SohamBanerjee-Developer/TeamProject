'use client';

import { useState, useEffect, useCallback } from 'react';
import {userSession} from "@/app/_lib/actions/Authentication/action";

export function useAuthClient() {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async() => {
            setLoading(true);
            try {
                const res = await userSession();
                if (res?.userId) {
                    setUser(res.userId);
                }
            }catch{
                setUser(null);
            }finally {
                setLoading(false)
            }
        })()
    }, []);
    return { user, loading, isAuthenticated: !!user};
}

