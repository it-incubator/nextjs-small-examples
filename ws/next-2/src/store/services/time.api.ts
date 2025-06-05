// timeApi.ts
import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '@/store/services/base-query-with-access-token';
import {getSharedSocket} from './socket';

export const timeAPI = createApi({
    reducerPath: 'timeAPI',
    tagTypes: ['server-time'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        serverTime: builder.query<{ time: string }, void>({
            queryFn: async () => ({data: {time: '---'}}),
            keepUnusedDataFor: 0,
            async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
                await cacheDataLoaded;
                const ws = getSharedSocket();

                const onServerTime = (data: { time: string }) => {
                    updateCachedData((draft) => {
                        draft.time = data.time;
                    });
                };

                ws.on('serverTime', onServerTime);

                await cacheEntryRemoved;
                // just remove the listener—don't disconnect the whole socket
                ws.off('serverTime', onServerTime);
            },
        }),

        notifications: builder.query<{ notifications: { message: string }[] }, void>({
            queryFn: async () => ({data: {notifications: []}}),
            keepUnusedDataFor: 0,
            async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
                await cacheDataLoaded;
                const ws = getSharedSocket();

                const onNotification = (data: { item: string }) => {
                    updateCachedData((draft) => {
                        draft.notifications.push({message: data.item});
                    });
                };

                ws.on('notification', onNotification);

                await cacheEntryRemoved;
                ws.off('notification', onNotification);
            },


        }),

        // --------------- 3) НОВЫЙ endpoint: roomMessages ---------------
        // Аргументом будет имя комнаты (string).
        // Возвращаемый тип — список сообщений (или можно любой shape, здесь для простоты просто массив строк).
        roomMessages: builder.query<{ messages: string[] }, string>({
            // т. к. никакого HTTP не нужно, queryFn просто возвращает «заглушку»
            queryFn: async (roomName) => ({ data: { messages: [] } }),
            keepUnusedDataFor: 0,
            async onCacheEntryAdded(
                roomName,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                await cacheDataLoaded;

                const ws = getSharedSocket();

                // 1) присоединяемся к комнате:
                ws.emit('joinRoom', roomName);

                // 2) заводим обработчик «roomMessage»
                const handleRoomMessage = (payload: { room: string; message: string }) => {
                    // Проверяем, что payload.room === roomName (для безопасности)
                    if (payload.room === roomName) {
                        updateCachedData((draft) => {
                            draft.messages.push(payload.message);
                        });
                    }
                };

                ws.on('roomMessage', handleRoomMessage);

                // 3) Ждём, когда подписка демонтируется:
                await cacheEntryRemoved;

                // При демонтировании:
                // — снимаем listener
                ws.off('roomMessage', handleRoomMessage);
                // — посылаем «leaveRoom»
                ws.emit('leaveRoom', roomName);
            },
        }),
    }),
});

export const {useServerTimeQuery, useNotificationsQuery, useRoomMessagesQuery} = timeAPI;
