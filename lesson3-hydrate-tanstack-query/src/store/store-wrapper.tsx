'use client'

import {queryClient, store} from '@/store/store';
import {QueryClientProvider} from '@tanstack/react-query';
import {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

export const StoreWrapper = ({children}: PropsWithChildren) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
)