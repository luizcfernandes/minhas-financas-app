import React  from "react";
import {Route,Routes, Navigate,  BrowserRouter, Router, HashRouter} from 'react-router-dom';
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer } from "./provedorAutenticacao";

/*
const RotaAutenticada = ({children,isUsuarioAutenticado, ...props}) => {
    return isUsuarioAutenticado ? children : <Navigate to="/login" state={{from : {...props.location }}}/>;
}
*/


function RotaAutenticada ({ element: Component , paths , isUsuarioAutenticado, ...props}) {
   
    return (
        <Routes> 
            <Route {...props} path={paths} element={ isUsuarioAutenticado  ? <Component /> : 
                    <Navigate to="/login" state={{from : props.location}} /> } />
        </Routes>
    )
}

/*
<Route path="/consulta-lancamentos" element={<RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado}>
                                                            <ConsultaLancamentos />
                                                          </RotaAutenticada>} />

                                                            <Route path="/" Component={Home} />
                <Route path="/cadastro-usuarios" Component={CadastroUsuario } />
                <Route path="/login" Component={Login} />
                <Route path="consulta-lancamentos" element={
                                            <RotaAutenticada>
                                                <ConsultaLancamentos  />
                                            </RotaAutenticada> } />               
                <Route path="/cadastro-lancamentos/:id?" element={
                                            <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} >
                                                <CadastroLancamentos  /> 
                                            </RotaAutenticada>} />
                <Route  path="/home" element={
                                            <RotaAutenticada  isUsuarioAutenticado={props.isUsuarioAutenticado} >
                                                 <Home />
                                            </RotaAutenticada>
                                                } />

*/
const Rotas = (props) => {
    return (
        <BrowserRouter>

           <RotaAutenticada path={'/login'} component={<Login />} />
           <RotaAutenticada component={<Home />} />
        </BrowserRouter>
    )
}

export default ()=> (
    <AuthConsumer>
        {(context)=>(<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
);