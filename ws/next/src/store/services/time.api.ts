import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from "@/store/services/base-query-with-access-token";
import {io} from "socket.io-client";


export const timeAPI = createApi({
    reducerPath: 'timeAPI',
    tagTypes: ['server-time'],
    baseQuery: baseQueryWithReauth,
    //baseQuery: baseQueryWithAccessToken,
    endpoints: (builder) => ({
        serverTime: builder.query<{ time: string }, void>({
            queryFn: async () => ({ data: { time: '---' } }), // short-circuits baseQuery
            keepUnusedDataFor: 0, // 👈 cleanup immediately after unmount
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                console.log('❤️ Connection will be created')
                const ws = io('http://localhost:3001');

                await cacheDataLoaded;

                ws.on('connect', () => {
                    console.log('✅ Connected to server');
                });

                ws.on('serverTime', (data: { time: string }) => {
                    console.log('🕒 Server time:', data.time);
                    updateCachedData((draft) => {
                        draft.time = data.time;
                    })

                });

                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved;
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                ws.disconnect()
                console.log('💀 Connection destroyed')
            },
        }),
    }),
})

export const {useServerTimeQuery} = timeAPI;