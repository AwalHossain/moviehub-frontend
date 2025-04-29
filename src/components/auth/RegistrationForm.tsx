
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


import { registerAction, RegisterState } from '@/action/auth';
import { useAuth } from '@/provider/AuthProvider';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface RegistrationFormProps {
    onLogin: () => void;
    onClose: () => void;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant="default"
            className="flex cursor-pointer items-center justify-center gap-2 w-full py-3 sm:py-3 px-2 sm:px-3 rounded-lg shadow-sm transition-colors"
            disabled={pending}>
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
        </Button>
    );
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onLogin, onClose }) => { // Add onClose here

    const { setUser } = useAuth();
    const initialState: RegisterState = { error: null, success: false, user: null };
    const [state, formAction] = useActionState(registerAction, initialState);

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        } else if (state?.success && state.user) {
            toast.success('Account created successfully!');
            setUser(state.user);
            onClose();
        }
    }, [state, setUser, onClose]);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center my-6 rounded-2xl sm:rounded-3xl gap-2 sm:gap-3">
                <div className="text-custom-content-primary text-center text-xl sm:text-heading-medium font-bold">Create Account</div>
                <div className="text-custom-content-secondary text-sm sm:text-body-17 text-center">
                    Create your account with your username and password
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-full sm:max-w-md mx-auto">

                {/* Update form to use action */}
                <form action={formAction} className='flex flex-col gap-2 mb-4'>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className="text-custom-content-primary text-[14px] sm:text-[16px]">Name</label>
                            <Input required type="text" name="name" placeholder="Enter your name" className='text-custom-content-primary py-6 rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className="text-custom-content-primary text-[14px] sm:text-[16px]">Email</label>
                            <Input required type="email" name="email" placeholder="Email" className='text-custom-content-primary py-6  rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className="text-custom-content-primary text-[14px] sm:text-[16px]">Password</label>
                            <Input required type="password" name="password" placeholder="Password" className='text-custom-content-primary py-6 rounded-xl' />
                        </div>
                    </div>
                    {/* Use SubmitButton */}
                    <SubmitButton />
                </form>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <div className="w-full h-[1px] bg-custom-border-gray-light"></div>
                        <p className="text-custom-content-secondary pt-3 text-sm sm:text-body-17 text-center">
                            Already have an account? <br />
                            <button onClick={onLogin} className="text-custom-green font-bold cursor-pointer">Login</button>
                        </p>
                    </div>
                </div>
            </div>
            {/* A bar between a word call "OR" */}
        </div >
    )
}

export default RegistrationForm
