import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CalculatorsPage from "./pages/CalculatorsPage";
import ErrorPage from "./pages/ErrorPage";
import ListOfCurrenciesPage from "./pages/ListOfCurrenciesPage";
import Root from "./components/Root";
import Authorization from "./pages/Authorization";
import ProfitTablesPage from "./pages/ProfitTablesPage";
import ProfitTablePage from "./pages/ProfitTablePage";

export const router = createBrowserRouter([
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
  {
    path: "/auth",
    element: <Authorization />,
    errorElement: <ErrorPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
