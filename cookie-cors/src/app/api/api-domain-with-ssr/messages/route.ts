import {getCORSHeaders} from "@/app/api/cors.helper";

export async function GET(
    req: Request
) {
    const headers = getCORSHeaders(req, ['https://dev.it-incubator.xxx','https://it-incubator.xxx'])

     return Response.json([{id: 1, content: 'hello Dimych'}, {id: 2, content: 'card pin code 1111'}], { headers }
    );
}