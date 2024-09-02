import "../App.css";
import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { lazy, Suspense } from "react";
const isProduction = import.meta.env.PROD;

const Root = () => {
    const TanStackRouterDevtools = isProduction
        ? () => null 
        : lazy(() =>
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        )

    return (
            <main className=''>
                <ScrollRestoration />
                <NavBar  />
                <Outlet />
                <Footer />
                <Suspense>
                    <TanStackRouterDevtools />
                </Suspense>
            </main>
    );
};

export const Route = createRootRoute({ component: Root });
