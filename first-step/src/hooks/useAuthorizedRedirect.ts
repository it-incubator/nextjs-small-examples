import {useRouter} from "next/navigation";
import {useGetMeQuery} from "@/features/auth/authSlice";
import {useEffect} from "react";

export const useAuthorizedRedirect = () => {
    const router = useRouter()

    const {data, error, isLoading, isFetching} = useGetMeQuery()

    useEffect(() => {
        if (data && !isFetching) {
            // If user is not authorized, redirect to login page
            router.push('/profile')
        }
    }, [data, isFetching])
}