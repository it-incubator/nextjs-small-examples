import {cookies} from "next/headers";

// ME
export async function GET(
    req: Request
) {
    const cookieStore = await cookies()

    const headers = new Headers();

    const allowedOrigins = ['https://it-incubator.xxx', 'https://hacker.xxx'];
    const origin = req.headers.get('Origin')!;
    if (allowedOrigins.includes(origin)) {
        headers.append('Access-Control-Allow-Origin', origin);
        headers.append('Access-Control-Allow-Credentials', 'true');
    }

    //headers.append('Access-Control-Allow-Origin', 'https://it-incubator.xxx,https://hacker.xxx');


    return new Response(
        JSON.stringify({ message: `cookies I got: ` + JSON.stringify(cookieStore.getAll(), null, 3) }),
        { headers }
    );


}