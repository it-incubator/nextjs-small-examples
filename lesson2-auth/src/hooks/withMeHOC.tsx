import {useRouter} from "next/navigation";
import {useGetMeQuery} from "@/store/services/auth/auth";
import {useEffect} from "react";

const withPrivateRouter = (C: any) => {

    return () => {

        const router = useRouter()

        const {data, isFetching} = useGetMeQuery()

        useEffect(() => {
            if (!data && !isFetching) {
                // save to localStorage/sessionStorage current page. чтобы после авпоториазии вернуть пользвоателя именно сюда
                // If user is not authorized, redirect to login page
                router.push('/login')
            }
        }, [data, isFetching])


        if (isFetching) return <span>...</span>

        if (!data) return <div></div>

        return <C/>
    }
}


const withRedirectForAuthenticatedUser = (C: any) => {

    return () => {
        const router = useRouter()

        const {data, isLoading} = useGetMeQuery()

        useEffect(() => {
            if (data) {
                router.push('/profile')
            }
        }, [data])

        if (isLoading) return <span>...</span>

        if (data) return <div></div>

        return <C/>
    }
}
