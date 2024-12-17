import {useGetMeQuery} from "@/features/auth/authSlice";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export const useMeWithAnonymRedirect = () => {
    const router = useRouter()

    const {data, error, isLoading, isFetching} = useGetMeQuery()

    useEffect(() => {
        console.log('data: ' + !!data)
        console.log('isFetching: ' + isFetching)
        if (!data && !isFetching) {
            // If user is not authorized, redirect to login page
            router.push('/auth/login')
        }
    }, [data, isFetching])

    return data
}

