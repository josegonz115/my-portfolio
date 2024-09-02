import "../App.css";
import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Root = () => {

    return (
            <main className=''>
                <NavBar  />
                <ScrollRestoration />
                <Outlet />
                <Footer />
                <TanStackRouterDevtools />
            </main>
    );
};

export const Route = createRootRoute({ component: Root });
