import {cookies} from "next/headers";

export async function GET(
    req: Request
) {
    const cookieStore = await cookies();
    //const token = cookieStore.get('token');

    const headers = new Headers();
     headers.append('Access-Control-Allow-Origin', 'https://it-incubator.xxx');
     headers.append('Access-Control-Allow-Credentials', 'true');

    return new Response(
        JSON.stringify({ message: `cookies I got: ` + JSON.stringify(cookieStore.getAll(), null, 3) }), { headers }
    );
}