"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client';
import { useAuth } from "./AuthProvider";

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuth();
    console.log(process.env.NEXT_PUBLIC_BASE_URL, 'process.env.NEXT_PUBLIC_BASE_URL');
    useEffect(() => {
        const socketInstance = io(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000', {
            withCredentials: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        })

        socketInstance.on('connect', () => {
            console.log('Socket connected!');
            setIsConnected(true);
            if (user) {
                socketInstance.emit('authenticate', user._id);
            }
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });


        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        socketInstance.on('connect_error', (err) => {
            console.error('Connection error:', err);
            setIsConnected(false);
        });

        // Set the socket in state
        setSocket(socketInstance);

        // Clean up on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, [user]);




    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};