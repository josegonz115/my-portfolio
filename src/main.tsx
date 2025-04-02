import { StrictMode } from "react";
// import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";

const router = createRouter({ routeTree, scrollRestoration: true });
// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
);
