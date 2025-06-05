import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useGetMeQuery} from "@/store/services/auth/auth";

export const useRedirectIfAuthorized = (redirecTo = '/posts') => {
    const router = useRouter()

    const {data, isLoading} = useGetMeQuery()

    useEffect(() => {
        if (data) {
            router.push(redirecTo)
        }
    }, [data])

    return isLoading
}