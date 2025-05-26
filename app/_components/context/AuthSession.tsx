"use client"

import {createContext, ReactNode, useContext, useReducer} from 'react';

export interface AuthState {
    user: string | null;
    isAuthenticated: boolean;
    dispatch: React.Dispatch<AuthAction>;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    dispatch: (): void => {}
};

export type AuthAction =
    | { type: 'SET_USER'; payload: string | null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
            };
        default:
            return state;
    }
}


export const AuthContext = createContext<AuthState>(initialState);

export const AuthSession = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>
    );
};

export const useAuthSeesion = () => {
    const value = useContext<AuthState>(AuthContext);
    if (!value) {
        throw new Error('useAuthSession must be used within an AuthSession');
    }
    return value;
}