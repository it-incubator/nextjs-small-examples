'use client'
import {useAppStore} from '@/store/store';
import React, {SyntheticEvent, useEffect, useRef, useState, useTransition} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {freshRickAndMortyApi, useGetCharacterQuery} from '@/features/rick-and-morty/fresh-slice';

export const RickAndMortyFreshList = ({ preloadedList }: any) => {
    console.log('preloadedList', preloadedList)
    const searchParams = useSearchParams();
    const router = useRouter();
    const store = useAppStore();
    const FIRST_PAGE = 1;
    const [page, setPage] = useState(FIRST_PAGE)
    const [searchName, setSearchName] = useState(searchParams.get('name') || '');
    // Using a query hook automatically fetches data and returns query values
    const requestArgs = {page: page, name: searchParams.get('name')}

    const {data, error, isLoading} = useGetCharacterQuery(requestArgs, {
        skip: page === FIRST_PAGE && !!preloadedList
    })
    console.log('data',data)

    useEffect(() => {
        if(preloadedList) {
            console.log('effect')
            store.dispatch(
                //@ts-ignore
                freshRickAndMortyApi.util.upsertQueryData('getCharacter', requestArgs, preloadedList)
            );
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
        setPage(prev => prev + 1)
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchName(event.target.value)
    }

    const [isPending, startTransition] = useTransition();
    function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            startTransition(() => {
                setPage(FIRST_PAGE);
                const params = new URLSearchParams(searchParams);

                if (!searchName) {
                    params.delete('name');
                } else {
                    params.set('name', searchName);
                }

                router.push(`?${params.toString()}`, { scroll: false });
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