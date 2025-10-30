import {CoursesListTanstack} from "@/components/courses-list-tanstack";

export default async function CoursesPage() {
    console.log('❌ NO SSR')
    return (<CoursesListTanstack />)
}
