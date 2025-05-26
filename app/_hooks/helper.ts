'use client';

import {useState, useEffect} from 'react';
import {userSession} from "@/app/_lib/actions/Authentication/action";

export function useAuthClient() {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const validSession = await userSession();

            if (validSession?.userId) {
                setUser(validSession.userId);
            }else{
                setUser(null);
            }
            setLoading(false);
        })()
    }, []);

    return {user, loading};
}
