import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MailPage from "./pages/MailPage";
import ComposePage from "./pages/ComposePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthPage />,
      },
      {
        path: "/mail",
        element: <MailPage />,
      },
      {
        path: "/compose",
        element: <ComposePage />,
      },

      // {
      //   path: "/profile",
      //   element: <CompleteProfile />,
      // },
      // {
      //   path: "/forget",
      //   element: <ForgotPassWordPage />,
      // },
      // {
      //   path: "/expense",
      //   element: <ExpensePage />,
      // },
    ],
  },
]);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
