import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useGetMeQuery} from "@/store/services/auth/auth";

export const useRequireMeWithAnonymRedirect = () => {
    const router = useRouter()

    const {data, isFetching} = useGetMeQuery()

    useEffect(() => {
        if (!data && !isFetching) {
            // save to localStorage/sessionStorage current page. чтобы после авпоториазии вернуть пользвоателя именно сюда
            // If user is not authorized, redirect to login page
            router.push('/login')
        }
    }, [data, isFetching])

    return data
}

