import {useQuery} from "@tanstack/react-query";

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses', 'list'],
        async queryFn() {
            const response = await fetch('http://localhost:3000/api/courses?page=1&limit=5')
            const json = await response.json();

            return json;
        }
    })
}