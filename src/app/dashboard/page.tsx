"use client"
import MovieForm from "@/components/dashboard/MovieForm";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddMoviePage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    // Redirect non-admin users
    useEffect(() => {
        if (!isLoading && (!user)) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-custom-dark min-h-screen text-white pt-[100px]">
            <div className="container mx-auto px-4 py-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Add New Movie</h1>
                    <p className="text-slate-400 mt-1">Fill in the form below to add a new movie to the database</p>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                    <MovieForm />
                </div>
            </div>
        </div>
    );
};

export default AddMoviePage; 