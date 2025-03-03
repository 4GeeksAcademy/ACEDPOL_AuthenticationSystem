// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AuthForm } from './pages/AuthForm';
import { Private } from "./pages/Private";
import { WithAuth } from './hoc/WithAuth';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm objetivo="iniciar sesión" />} />
            <Route path="/signup" element={<AuthForm objetivo="registrar" />} />
            <Route path="/private" element={<WithAuth page={<Private />} />} />
        </Route>
    )
);