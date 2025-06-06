import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    console.log('Middleware running for path:', req.nextUrl.pathname);
    const token = req.nextauth.token;
    console.log('Token:', token);
    
    const isAdmin = token?.email === "admin@example.com";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    console.log('Is admin route:', isAdminRoute);
    console.log('Is admin user:', isAdmin);

    if (isAdminRoute && !isAdmin) {
      console.log('Redirecting to login...');
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Authorization check:', !!token);
        return !!token;
      }
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
  ]
} 