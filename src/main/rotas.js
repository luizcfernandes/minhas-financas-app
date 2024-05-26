import React from "react";
import {Route,Routes, BrowserRouter} from 'react-router-dom';
import Login from "../views/login";
import CadastroUsuario from "../views/usuario";
import Home from "../views/home";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" Component={Home} />
                <Route path="/login" Component={Login } />
                <Route path="/cadastro-usuarios" Component={CadastroUsuario} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;