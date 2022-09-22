import Home from "./pages/Home"
import { createBrowserRouter } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/:type",
        element: <DashBoard />,
    }
]);

export default router;