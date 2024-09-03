
// Rutas que no necestian authentication
export const publicRoutes = [
    "/",
    "/auth/new-verification",
];

// Rutas que redireccionan a los usuarios
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

export const apiAuthProfix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";