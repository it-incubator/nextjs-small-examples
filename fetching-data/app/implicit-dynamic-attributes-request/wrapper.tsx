'use client'
import {useSearchParams} from "next/navigation";
import {PokemonFetcher} from "@/shared/components/TimeDisplay/TimeFetcher";

let counter = 0

export async function Wrapper() {
    console.log('ImplicitDynamicRequest Wrapper: ' + ++counter)
    const param = useSearchParams();
    return <>from dynamic server component: <PokemonFetcher/></>
}