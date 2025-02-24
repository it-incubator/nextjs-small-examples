'use client'
import {useAppStore} from '@/store/store';
import React, {useEffect, useState, useTransition} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {freshRickAndMortyApi, useLazyGetCharacterQuery} from '@/features/rick-and-morty/fresh-slice';

export const RickAndMortyFreshListLazy = ({ preloadedList }: any) => {
    console.log('preloadedList', preloadedList)
    const searchParams = useSearchParams();
    const router = useRouter();
    const store = useAppStore();
    const FIRST_PAGE = 1;
    const [searchName, setSearchName] = useState(searchParams.get('name') || '');

    const [trigger, { data, isLoading, error, originalArgs }] = useLazyGetCharacterQuery()
    console.log('data',data)
    const filters = { name: searchParams.get('name')}

    useEffect(() => {
        const args = {page: FIRST_PAGE, ...filters}

        if(preloadedList) {
            console.log('effect')
            store.dispatch(
                //@ts-ignore
                freshRickAndMortyApi.util.upsertQueryData('getCharacter', args, preloadedList)
            );
        } else {
            trigger(args)
        }
    }, [preloadedList])


    useEffect(() => {
        return () => {
            store.dispatch(
                freshRickAndMortyApi.util.resetApiState()
            )
        }
    }, []);

    function next() {
        const page = originalArgs ? originalArgs.page : FIRST_PAGE
        trigger({...filters, page: page + 1})
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchName(event.target.value)
    }

    const [isPending, startTransition] = useTransition();
    function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            startTransition(() => {
                const params = new URLSearchParams(searchParams);
                console.log('params', params)
                if (!searchName) {
                    params.delete('name');
                } else {
                    params.set('name', searchName);
                }

                router.push(`?${params.toString()}`, { scroll: false });

                if(!preloadedList) {
                trigger({page: FIRST_PAGE, name: searchName });
                }
            });
        }
    }



    console.log("isLoading: ", isLoading)

    const dataForRender = data || preloadedList;

    return (
        <div className="App">
            {error && (
                <>Oh no, there was an error</>
            ) }
            { isLoading && !dataForRender &&
                <>Loading...</>
            }
            { dataForRender &&
                <div> <ul>{dataForRender.map((list: any, index: number) => {
                        return <li key={list.id}>
                            {index + 1} - {list.name}
                        </li>

                    }
                )} </ul>
                    <button onClick={next}>NEXT</button>
                    <input onChange={onChange} onKeyDown={onKeyPress} value={searchName}/>
                    name term ex. "rick", "morty". Enter to apply
                </div>
            }
        </div>
    )
}