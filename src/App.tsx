import { lazy } from "react";
import "./App.css";
import {
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
  Route,
  defer,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import AppConfig from "./AppConfig";
import Protected from "./auth/Protected";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Todo = lazy(() => import("./pages/Todo"));

const getUserData = async () => {
  try {
    const user = await fetch(AppConfig.API + "/auth/session", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return user;
  } catch (error) {
    return null;
  }
};

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<AuthLayout />}
        loader={() => defer({ userPromise: getUserData() })}
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected />}>
          <Route path="/" element={<Navigate to={"/todo"} />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
