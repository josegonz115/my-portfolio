import "../App.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Root = () => {

    return (
        <main className=''>
            <NavBar  />
            {/* <hr className="border border-black dark:border-white"/> */}
            <Outlet />
            <Footer />
            <TanStackRouterDevtools />
        </main>
    );
};

export const Route = createRootRoute({ component: Root });
