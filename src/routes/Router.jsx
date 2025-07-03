import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import Navbar from "../components/Navbar";
import Home from "../page/Home";
import Watch from "../page/Watch";
import SignUp from "../page/SignUp";
import Signin from "../page/SignIn";
import Search from "../page/Search";
import Likes from "../page/Likes";

const Layout = () => {
  let user = JSON.parse(localStorage.getItem("UserName-Account"));
  // if (!user) {
  //   return <Navigate to={"/signin"} />;
  // }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/watch/:id", element: <Watch /> },
      { path: "/search/:query", element: <Search /> },
      { path: "/likes", element: <Likes /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
