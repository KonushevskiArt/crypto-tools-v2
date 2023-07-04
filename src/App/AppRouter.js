import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root from "./components/Root";
import Authorization from "./pages/Auth";
import ListOfCurrenciesPage from "./pages/ListOfCurrenciesPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import ProfitTablesPage from "./pages/ProfitTablesPage";
import ProfitTablePage from "./pages/ProfitTablePage";

export const router = createBrowserRouter([
  {
    path: "auth",
    element: <Authorization />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Authorization />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "calculators",
        element: <CalculatorsPage />,
      },
      {
        path: "tables",
        element: <ProfitTablesPage />,
      },
      {
        path: "tables/:id",
        element: <ProfitTablePage />,
      },
      {
        index: true,
        element: <ListOfCurrenciesPage />,
      },
    ],
  },
  
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
