import { loginAction, LoginState } from '@/action/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/provider/AuthProvider';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface LoginFormProps {
    onRegistration: () => void
    onClose: () => void
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant="default"
            className="flex cursor-pointer items-center justify-center gap-2 w-full py-3 sm:py-3 px-2 sm:px-3 rounded-lg shadow-sm transition-colors"
            disabled={pending}>
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
        </Button>
    );
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegistration, onClose }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser } = useAuth();
    const initialState: LoginState = { error: null, success: false, user: null };
    const [state, formAction] = useActionState(loginAction, initialState);

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        } else if (state?.success && state.user) {
            toast.success('Login successful!');
            setUser(state.user);
            onClose();

            // If redirected from a protected page, navigate back there
            const authRequired = searchParams.get('authRequired');
            if (authRequired === 'true') {
                // Remove the query parameter and navigate
                const url = new URL(window.location.href);
                url.searchParams.delete('authRequired');
                router.replace(url.pathname);
            }
        }
    }, [state, router, onClose, setUser, searchParams]);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center my-4 rounded-2xl sm:rounded-3xl gap-2 sm:gap-3">
                <div className="text-custom-content-primary text-center text-xl sm:text-heading-medium font-bold">Login</div>
                <div className="text-custom-content-secondary text-sm sm:text-body-17 text-center">
                    Login easily with your account
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-full sm:max-w-md mx-auto">

                <form action={formAction} className='flex flex-col gap-2 mb-4'>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className="text-custom-content-primary text-[14px] sm:text-[16px]">Email</label>
                            <Input required type="email" name="email" placeholder="Email" className='text-custom-content-primary py-6 rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className="text-custom-content-primary text-[14px] sm:text-[16px]">Password</label>
                            <Input required type="password" name="password" placeholder="Password" className='text-custom-content-primary py-6 rounded-xl' />
                        </div>
                    </div>
                    <SubmitButton />
                </form>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <div className="w-full h-[1px] bg-custom-border-gray-light"></div>
                        <p className="text-custom-content-secondary pt-3 text-sm sm:text-body-17 text-center">
                            Don&apos;t have an account? <br />
                            <button onClick={onRegistration} className="text-custom-green font-bold cursor-pointer">Create Account</button>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginForm
