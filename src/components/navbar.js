//import AuthService from "../app/service/authService";
import { AuthConsumer } from "../main/provedorAutenticacao";
import NavbarItem from "./navbarItem";

/*
const deslogar = () => {
  AuthService.removerUsuarioAutenticado();
}
const isUsuarioAutenticado =()=>{
  return AuthService.isUsuarioAutenticado();
}
*/
const Navbar=(props)=>{
    console.log("--------- valor de props.isUsuarioAutenticado",props.isUsuarioAutenticado);
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
          <a href="/home" className="navbar-brand" style={{fontSize: '20px', fontWeight: 'bolder'}}>Minhas Finanças</a>
          <button className  ="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem render={ props.isUsuarioAutenticado} href="/home#" label="Home" />
                <NavbarItem render={ props.isUsuarioAutenticado} href="/consulta-lancamentos#" label = "Buscas" />
                <NavbarItem render={ props.isUsuarioAutenticado} href="/cadastro-lancamentos#" label="Lançamentos" />
                <NavbarItem render={ props.isUsuarioAutenticado} href="/cadastro-usuarios#" label="Usuários" />
                <NavbarItem render={ props.isUsuarioAutenticado} onClick={props.deslogar} href="/login/#" label="Sair" />
            </ul>
          </div>
        </div>
      </div>
    )
}

export default () => (
  <AuthConsumer>
    {(context) =>(
      <Navbar  isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
    )}
  </AuthConsumer>
);