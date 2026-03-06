import HomePage from "./pages/home/Home";
import AnimationsPage from "./pages/animations/animationsPage/Animations";
import AnimationDetailPage from "./pages/animations/animationsDetailPage/AnimationDetailPage";
import RootLayout from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/animations", element: <AnimationsPage /> },
      {path: "/animations/:id", element:<AnimationDetailPage/>}
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
