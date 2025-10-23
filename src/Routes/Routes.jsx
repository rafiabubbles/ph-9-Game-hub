import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import AllGames from "../Pages/AllGames";
import GameDetail from "../Pages/GameDetails";
import MyGames from "../Pages/MyGames";
import MyProfile from "../Pages/MyProfile";
import UpdateProfile from "../Pages/UpdateProfile";
import PrivateRoute from "../Components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home />,
                loader: () => fetch('/games.json')
            },
            {
                path: "/home",
                element: <Home />,
                loader: () => fetch('/games.json')
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forget-password",
                element: <ForgotPassword />,
            },
            {
                path: "/games",
                element: <PrivateRoute>
                    <AllGames />
                </PrivateRoute>,
                loader: () => fetch('/allGamesData.json')
            },
            {
                path: "/games/:id",
                element: <PrivateRoute>
                    <GameDetail />
                </PrivateRoute>
            },
            {
                path: "/mygames",
                element: <PrivateRoute><MyGames /></PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/update-profile",
                element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
            },
            {
                path: "/my-profile",
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            }
        ],
    },
]);