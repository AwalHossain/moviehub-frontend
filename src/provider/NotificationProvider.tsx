"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
}

interface NotificationData {
    id?: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    movieTitle?: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { socket, isConnected } = useSocket();

    const unreadCount = notifications.filter(n => !n.read).length;

    // Mark a notification as read
    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    // Remove a notification
    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    // Clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Listen for notification events
    useEffect(() => {
        if (!socket || !isConnected) return;

        const handleNewNotification = (data: NotificationData) => {
            const newNotification: Notification = {
                id: data.id || Date.now().toString(),
                message: data.message,
                type: data.type || 'info',
                timestamp: new Date(),
                read: false
            };

            setNotifications(prev => [newNotification, ...prev]);
        };

        // Listen for notification events
        socket.on('notification', handleNewNotification);

        // Sample event for review notifications
        socket.on('movie:review', (data: NotificationData) => {
            console.log(data, "movie review");
            const newNotification: Notification = {
                id: Date.now().toString(),
                message: `New review for ${data.movieTitle || 'a movie'}`,
                type: 'info',
                timestamp: new Date(),
                read: false
            };

            setNotifications(prev => [newNotification, ...prev]);
        });

        socket.on('movie:added', (data: NotificationData) => {
            console.log(data, "movie added");
            const newNotification: Notification = {
                id: Date.now().toString(),
                message: `New movie added: ${data.movieTitle || 'a movie'}`,
                type: 'info',
                timestamp: new Date(),
                read: false
            };

            setNotifications(prev => [newNotification, ...prev]);
        });


        // Listen for movie-specific review events (format: movie:{id}:review)
        // socket.onAny((event, data) => {
        //     if (typeof event === 'string' && event.match(/^movie:[^:]+:review$/)) {
        //         console.log(`Caught movie-specific review event: ${event}`, data);
        //         const newNotification: Notification = {
        //             id: Date.now().toString(),
        //             message: `New review for ${data?.movieTitle || 'a movie'}`,
        //             type: 'info',
        //             timestamp: new Date(),
        //             read: false
        //         };

        //         setNotifications(prev => [newNotification, ...prev]);
        //     }
        // });

        return () => {
            socket.off('notification', handleNewNotification);
            socket.off('movie:review');
        };
    }, [socket, isConnected]);

    const value = {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}; 