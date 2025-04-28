import { LayoutDashboard, LogOut, UserIcon } from "lucide-react";

const ProfileItems = [
    {
        key: "MyAccount",
        label: "My Account",
        url: "/account",
        icon: (
            <UserIcon className="w-5 h-5 text-white lg:text-custom-content-tertiary group-hover:text-custom-content-white" />
        ),
    },
    {
        key: "Dashboard",
        label: "Dashboard",
        url: "/dashboard",
        icon: (
            <LayoutDashboard className="w-5 h-5 text-white lg:text-custom-content-tertiary group-hover:text-custom-content-white" />
        ),
    },
    {
        key: "Logout",
        label: "Logout",
        url: "#",
        icon: (
            <LogOut className="w-5 h-5 text-white lg:text-custom-content-tertiary group-hover:text-custom-content-white" />
        ),
        action: "logout",
    },
];

export default ProfileItems;
