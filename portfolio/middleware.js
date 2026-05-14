import { NextResponse } from 'next/server';

export function middleware(request){
    const token = request.cookies.get("token");
    console.log(`Token: ${token}`);


    const isProtectedRoute = request.nextUrl.pathname.startsWith("/(dashboard)");
    if(isProtectedRoute && !token){
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/(dashboard)", "/(dashboard)/:path*"]
}