import {NextRequest, NextResponse} from "next/server";
import {
    singledomainWithSsrMiddleware
} from "@/app/recommendations/singledomain-with-ssr/singledomain-with-ssr-middleware";
import {apiDomainWithSsrMiddleware} from "@/app/recommendations/api-domain-with-ssr/api-domain-with-ssr-middleware";
import {
    apiAuthDomainWithSsrMiddleware
} from "@/app/recommendations/api-auth-domains-with-ssr/api-auth-domain-with-ssr-middleware";


export async function middleware(request: NextRequest) {
    const url = request.nextUrl;

    if (url.pathname.startsWith('/recommendations/singledomain-with-ssr')) {
        const response = singledomainWithSsrMiddleware(request);
        if (response) return response;
    }

    if (url.pathname.startsWith('/recommendations/api-domain-with-ssr')) {
        const response = apiDomainWithSsrMiddleware(request);
        if (response) return response;
    }

    if (url.pathname.startsWith('/recommendations/api-auth-domains-with-ssr')) {
        const response = apiAuthDomainWithSsrMiddleware(request);
        if (response) return response;
    }

    return NextResponse.next();
}

