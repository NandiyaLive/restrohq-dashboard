import { authRoutes, defaultRedirect, publicRoutes } from "@/lib/routes";

async function middleware(req) {
  const { nextUrl: url } = req;
  const isAuthenticated = req.cookies.get("is_authenticated");

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(defaultRedirect, url));
    }

    return null;
  }

  if (!isPublicRoute && !isAuthenticated) {
    return Response.redirect(new URL("/auth/sign-in", url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
  ],
};

export default middleware;
