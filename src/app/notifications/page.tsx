"use client";

import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/utils";
import { useNotifications } from "@/provider/NotificationProvider";
import { Bell, Check, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";



export default function NotificationsPage() {
    const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications();
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.read);

    const hasUnread = notifications.some(n => !n.read);

    if (notifications.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
                <div className="text-center py-16">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">No Notifications</h1>
                    <p className="text-gray-400 mb-8">You don&apos;t have any notifications yet.</p>
                    <Link href="/">
                        <Button variant="default">Return Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                <div className="flex items-center gap-2">
                    <div className="flex rounded-lg overflow-hidden border border-gray-700">
                        <button
                            className={`px-3 py-1 text-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-transparent text-gray-400'}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`px-3 py-1 text-sm ${filter === 'unread' ? 'bg-primary text-white' : 'bg-transparent text-gray-400'}`}
                            onClick={() => setFilter('unread')}
                        >
                            Unread
                        </button>
                    </div>

                    <div className="flex gap-2">
                        {hasUnread && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={markAllAsRead}
                                className="text-xs flex items-center gap-1"
                            >
                                <Check className="w-3 h-3" />
                                Mark all read
                            </Button>
                        )}

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={clearAllNotifications}
                            className="text-xs flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" />
                            Clear all
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${notification.read ? 'border-gray-800 bg-gray-900/50' : 'border-primary/30 bg-primary/5'}`}
                        >
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2 py-0.5 text-xs rounded-full ${notification.type === 'error' ? 'bg-red-900/20 text-red-400' :
                                            notification.type === 'success' ? 'bg-green-900/20 text-green-400' :
                                                notification.type === 'warning' ? 'bg-amber-900/20 text-amber-400' :
                                                    'bg-blue-900/20 text-blue-400'
                                            }`}
                                    >
                                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                    </span>
                                    {!notification.read && (
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    )}
                                </div>
                                <span className="text-xs text-gray-400">
                                    {formatTimeAgo(new Date(notification.timestamp))}
                                </span>
                            </div>

                            <p className="text-white mt-2">{notification.message}</p>

                            <div className="flex justify-end mt-3 gap-2">
                                {!notification.read && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-xs h-7 px-2"
                                    >
                                        Mark as read
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeNotification(notification.id)}
                                    className="text-xs h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-950/20"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-gray-900/50 rounded-lg">
                        <p className="text-gray-400">No {filter === 'unread' ? 'unread' : ''} notifications to display</p>
                    </div>
                )}
            </div>
        </div>
    );
} 