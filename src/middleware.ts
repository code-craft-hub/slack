import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
  } from "@convex-dev/auth/nextjs/server";

   
  const isPublicPage = createRouteMatcher(["/auth"]);
   
  export default convexAuthNextjsMiddleware(async (request) => {
    console.log(await isAuthenticatedNextjs())
    if(!isPublicPage(request) && !(await isAuthenticatedNextjs())) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }
  });
   
  export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };