'use client'
import {useSearchParams} from "next/navigation";
import {TimeFetcher} from "@/shared/components";

let counter = 0

export async function Wrapper() {
    console.log('ImplicitDynamicRequest Wrapper: ' + ++counter)
    const param = useSearchParams();
    return <>from dynamic server component: <TimeFetcher/></>
}