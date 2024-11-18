import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Private from "./Private";
import Sair from "../pages/Sair";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sair" element={<Sair />} />
            <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />

        </Routes>
    );
}

export default RoutesApp;