"use client"

import { clearCookies } from "@/action/set-cookie";
import { checkSession } from '@/services/server-fetch';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
    initialUser: {
        _id: string | null;
        name: string | null;
        email?: string | null;
        role?: string | null;
    };
}

interface User {
    _id: string;
    name: string;
    email?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    isLoading: boolean;
    // Auth modals state
    isLoginOpen: boolean;
    isRegistrationOpen: boolean;
    openLoginModal: () => void;
    openRegistrationModal: () => void;
    closeAuthModals: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
    const searchParams = useSearchParams();

    // User state
    const [user, setUser] = useState<User | null>(() => {
        if (initialUser && initialUser._id && initialUser.name) {
            return {
                _id: initialUser._id,
                name: initialUser.name,
                email: initialUser.email || undefined,
                role: initialUser.role || undefined,
            };
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState<boolean>(!initialUser?._id);

    // Auth modals state
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginOpen(true);
        setIsRegistrationOpen(false);
    };

    const openRegistrationModal = () => {
        setIsLoginOpen(false);
        setIsRegistrationOpen(true);
    };

    const closeAuthModals = () => {
        setIsLoginOpen(false);
        setIsRegistrationOpen(false);
    };

    const logout = async () => {
        setUser(null);
        try {
            await clearCookies();
        } catch (error) {
            console.error("AuthProvider: Failed to clear server cookies:", error);
        }
        Cookies.remove('accessToken');
    }

    // Check for auth required query parameter
    useEffect(() => {
        const authRequired = searchParams.get('authRequired');
        if (authRequired === 'true' && !user) {
            openLoginModal();
        }
    }, [searchParams, user]);

    useEffect(() => {
        if (!user && !isLoading) {
            console.log('AuthProvider Effect: No user state, attempting silent auth check...');
        }

        if (!initialUser?._id) {
            setIsLoading(true);
            const verifyUserSession = async () => {
                try {
                    const result = await checkSession();
                    if (result.success && result.user) {
                        setUser(result.user);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error('AuthProvider: Error during session verification:', error);
                    setUser(null);
                } finally {
                    setIsLoading(false);
                }
            };
            verifyUserSession();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value: AuthContextType = {
        user,
        setUser,
        logout,
        isLoading,
        isLoginOpen,
        isRegistrationOpen,
        openLoginModal,
        openRegistrationModal,
        closeAuthModals
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
