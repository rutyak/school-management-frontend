import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentManagement from "./pages/student/StudentManagement";
import TeacherManagement from "./pages/teacher/TeacherManagement";
import ClassManagement from "./pages/class/ClassManagement";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Analytics from "./pages/analytics/Analytics";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/main",
    element: <Main/>,
    children: [
      {
        path: "",
        element: <ClassManagement />,
      },
      {
        path: "student",
        element: <StudentManagement />,
      },
      {
        path: "teacher",
        element: <TeacherManagement />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router}>
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </RouterProvider>
  </React.StrictMode>
);
