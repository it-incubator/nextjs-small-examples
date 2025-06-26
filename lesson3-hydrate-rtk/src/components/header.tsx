'use client'
import Link from "next/link";

export const Header = () => {
    return <div>
        <Link href={'/'}>LOGO</Link>
        <br/>
        <Link href={'/courses'}>Courses</Link>
        <br/>
        <Link href={'/courses/ssr'}>Courses SSR</Link>
    </div>
}

