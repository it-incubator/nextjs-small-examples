import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useGetMeQuery} from "@/store/services/auth/auth";

export const useRedirectIfAnonymousWithUser = () => {
    const router = useRouter()

    const {data, error, isLoading, isFetching} = useGetMeQuery()

    useEffect(() => {
        console.log('data: ' + !!data)
        console.log('isFetching: ' + isFetching)
        if (!data && !isFetching) {
            // If user is not authorized, redirect to login page
            router.push('/login')
        }
    }, [data, isFetching])

    return data
}

