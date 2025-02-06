// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Game from "./pages/Game";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <div className="h-screen w-full bg-[#302E2B] text-white">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  // </StrictMode>
);
