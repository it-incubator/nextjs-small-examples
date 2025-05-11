import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useGetMeQuery} from "@/store/services/auth/auth";

export const useRedirectIfAuthorized = (redirecTo = '/posts') => {
    const router = useRouter()

    const {data, isLoading} = useGetMeQuery()

    useEffect(() => {
        if (data) {
       // if (data && !isFetching) { todo: isFetching need here???
            // If user is not authorized, redirect to login page
            router.push(redirecTo)
            // router.push(redirecTo + '/' + data.userId)
        }
    }, [data])
    //}, [data, isFetching])

    return isLoading
}