import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Homepage.jsx";
import { HelmetProvider } from 'react-helmet-async';
import PostListPage from "./routes/PostListPage.jsx";
import Write from "./routes/Write.jsx";
import Blog from "./routes/Blog.jsx";
import About from "./routes/About.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/posts", element: <PostListPage /> },
      { path: "/:slug", element: <SinglePostPage /> },
      { 
        path: "/write", 
        element: (
          <>
            <SignedIn><Write /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        ) 
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/blog", element: <Blog /> },
      { path: "/about", element: <About /> },
      { path: "*", element: <div>404 - Page Not Found</div> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </HelmetProvider>
    </ClerkProvider>
  </StrictMode>
);
