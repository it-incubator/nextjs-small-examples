import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useGetMeQuery} from "@/store/services/auth/auth";

export const useRedirectIfAuthorized = (redirecTo = '/posts') => {
    const router = useRouter()

    const {data, error, isLoading, isFetching} = useGetMeQuery()

    useEffect(() => {
        if (data && !isFetching) {
            // If user is not authorized, redirect to login page
            router.push(redirecTo)
        }
    }, [data, isFetching])
}