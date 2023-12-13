import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/home.jsx";
import MovieCategoria from "./pages/movieCategorie.jsx";
import MovieSearch from "./pages/movieSearch.jsx";
import { QuerySearchProvider } from "./Context/movieSearchProvider.jsx";
import MovieDetail from "./pages/movieDetail.jsx";
import PageNotFound from "./pages/pageNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categoria/:tag",
        element: <MovieCategoria />,
      },
      {
        path: "/search",
        element: <MovieSearch />,
      },
      {
        path: "/movie/detalhes/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuerySearchProvider>
      <RouterProvider router={router} />
    </QuerySearchProvider>
  </React.StrictMode>
);
