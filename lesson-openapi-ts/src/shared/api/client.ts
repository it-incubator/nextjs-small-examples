import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "./schema";

export const client = createClient<paths>({ baseUrl: "https://inctagram.work" });
const refreshClient = createClient<paths>({ baseUrl: "https://inctagram.work" });

export const getAccessToken = () => localStorage.getItem('lesson-access-token')
export const removeAccessToken = () => localStorage.removeItem('lesson-access-token')
export const saveAccessToken = (token: string) =>   localStorage.setItem('lesson-access-token', token)

const authMiddleware: Middleware = {
    async onRequest({ request }) {
        const accessToken = getAccessToken()
        if (accessToken) {
            request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return request;
    },
    async onResponse({ request, response }) {
        if (response.status === 401) {
            const accessToken = getAccessToken();
            if (!accessToken) return response;

            const updateResponse = await refreshClient.POST('/api/v1/auth/update', {
                credentials: 'include'
            })
            if (updateResponse.data) {
                saveAccessToken(updateResponse.data.accessToken)
                request.headers.set('Authorization', `Bearer ${updateResponse.data.accessToken}`)
                return fetch(request.url, request);
                // repeat original request
                // const newResponse = makeTheSameRequzesr()
                // return newResponse
            } else {
                removeAccessToken();
                return response
            }
        }
        return response;
    },
};

client.use(authMiddleware)


//const response = await client.GET('/api/v1/users/profile')

//response.data?.avatars.map(a => a.url)