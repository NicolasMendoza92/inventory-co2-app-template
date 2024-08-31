import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, apiAuthProfix, authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
    const { auth, nextUrl } = req;
    const isLoggedIn = !!auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthProfix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return ;
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl))
    }
    return;

  });

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };