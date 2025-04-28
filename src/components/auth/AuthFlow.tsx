"use client"

import { useState } from 'react'

import AuthDialog from '@/components/auth/AuthDialog'
import { Button } from "@/components/ui/button"
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'





const AuthFlow: React.FC = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

    const openLoginModal = () => {
        setIsLoginOpen(true)
        setIsRegistrationOpen(false)
    }

    const openRegistrationModal = () => {
        console.log("openRegistrationModal");
        setIsLoginOpen(false)
        setIsRegistrationOpen(true)
    }

    const onClose = () => {
        setIsLoginOpen(false)
        setIsRegistrationOpen(false)
    }


    return (
        <div>
            <Button onClick={openLoginModal}
                variant="outline"
                className="w-full cursor-pointer px-4 py-2 hover:bg-secondary hover:text-white rounded-xl border-primary hover:border-transparent flex items-center justify-center"
            >Login</Button>

            <AuthDialog
                isOpen={isLoginOpen}
                onOpenChange={setIsLoginOpen}
            >
                <LoginForm onRegistration={openRegistrationModal} onClose={onClose} />
            </AuthDialog>

            <AuthDialog
                isOpen={isRegistrationOpen}
                onOpenChange={setIsRegistrationOpen}
            >
                <RegistrationForm onLogin={openLoginModal} onClose={onClose} />
            </AuthDialog>


        </div>
    )
}

export default AuthFlow;