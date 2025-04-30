"use client"

import AuthDialog from '@/components/auth/AuthDialog'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/provider/AuthProvider'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

interface AuthFlowProps {
    onInteraction?: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onInteraction }) => {
    const {
        isLoginOpen,
        isRegistrationOpen,
        openLoginModal,
        openRegistrationModal,
        closeAuthModals
    } = useAuth();

    const handleLoginClick = () => {
        openLoginModal();
        if (onInteraction) onInteraction();
    };

    return (
        <div>
            <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full cursor-pointer px-4 py-2 hover:bg-secondary hover:text-white rounded-xl border-primary hover:border-transparent flex items-center justify-center"
            >
                Login
            </Button>

            <AuthDialog
                isOpen={isLoginOpen}
                onOpenChange={(open) => {
                    if (!open) closeAuthModals();
                }}
            >
                <LoginForm
                    onRegistration={openRegistrationModal}
                    onClose={closeAuthModals}
                />
            </AuthDialog>

            <AuthDialog
                isOpen={isRegistrationOpen}
                onOpenChange={(open) => {
                    if (!open) closeAuthModals();
                }}
            >
                <RegistrationForm
                    onLogin={openLoginModal}
                    onClose={closeAuthModals}
                />
            </AuthDialog>
        </div>
    )
}

export default AuthFlow;