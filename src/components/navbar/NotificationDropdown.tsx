import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/provider/NotificationProvider";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NotificationDropdownProps {
    isMobile?: boolean;
}

const NotificationDropdown = ({ isMobile = false }: NotificationDropdownProps) => {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    const handleNotificationClick = (id: string) => {
        markAsRead(id);
        setIsOpen(false);
    };


    const formatTimestamp = (date: Date) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return "recently";
        }
    };

    // Get notification type icon/color
    const getNotificationTypeStyle = (type: string) => {
        switch (type) {
            case 'error':
                return 'text-red-500';
            case 'success':
                return 'text-green-500';
            case 'warning':
                return 'text-amber-500';
            default:
                return 'text-blue-500';
        }
    };

    // If on mobile view, just show the bell icon and count
    if (isMobile) {
        return (
            <>
                <Bell className="w-5 h-5 hover:text-white" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="relative p-2 border-2 rounded-xl border-primary focus:text-primary hover:text-primary mr-2"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="z-50 bg-background dark:bg-dark-background rounded-xl p-2 mt-2 shadow-lg w-72 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-2 px-2">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            className="text-xs h-7 px-2 text-primary"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <div className="text-center py-6 text-sm text-custom-content-tertiary">
                        No notifications
                    </div>
                ) : (
                    <div className="space-y-1">
                        {notifications.slice(0, 5).map(notification => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={`flex flex-col items-start p-2 rounded-lg cursor-pointer hover:bg-slate-100 ${notification.read ? 'opacity-70' : 'bg-slate-50'}`}
                                onClick={() => handleNotificationClick(notification.id)}
                            >
                                <div className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                        <span className={`text-xs font-medium ${getNotificationTypeStyle(notification.type)}`}>
                                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                        </span>
                                        <span className="text-xs text-custom-content-tertiary">
                                            {formatTimestamp(notification.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-sm mt-1 text-custom-content-secondary">
                                        {notification.message}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-2 right-2" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </div>
                )}

                {notifications.length > 5 && (
                    <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                        <Link href="/notifications" className="text-xs text-primary hover:underline">
                            View all notifications
                        </Link>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown; 