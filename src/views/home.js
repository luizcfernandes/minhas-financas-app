import React, { Component } from "react";
import UsuarioService from "../app/service/usuarioService";
//import LocalStorageService from "../app/service/localstorageService";
//import CoookiesService from "../app/service/cookiesService";
import { AuthContext } from "../main/provedorAutenticacao";


class Home extends Component{

    state = {
        saldo : 0,
        usuarioLogado : null
    }

   constructor() {
    super();
    this.usuarioService = new UsuarioService();
   }

    componentDidMount() {
       // const usuarioLogadoString = LocalStorageService.obterItem('_usuario_logado');
               
       //const usuarioLogado =  usuarioLogadoString != null || usuarioLogadoString !== "" ? usuarioLogadoString : 0;
        //CoookiesService.removerCookies('idUsuarioCookie');
       //const usuarioLogado = CoookiesService.obterCookies('idUsuarioCookie') 
       //const usuarioLogado =  LocalStorageService.obterItem('_usuario_logado') ? 
        //        LocalStorageService.obterItem('_usuario_logado') : CoookiesService.obterCookies('idUsuarioCookie');
       //console.log(usuarioLogado);
       const usuarioLogado = this.context.usuarioAutenticado;
       if(!this.props.isAutenticado) {
        console.log('usuarioLogado',usuarioLogado);
        
       } else {
         console.log("Usuario já nao está autentitcado")
       }
       
       
       /*if (logado && logado.length > 1) {
            console.log('usuario logado->',logado.id)
            this.setState({usuarioLogado : logado});
       } */
      // console.log('aqui está ok',logado.id);
       // console.log('usuario id',this.state.usuarioLogado.id);
        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({
                    saldo: response.data
                });
            })
            .catch(error=>{
                console.error(error.response)
            });
    }
    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo} </p>
                <hr className="my-4"></hr>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead" >
                
                <a className="btn btn-primary btn-lg" 
                        href="/cadastro-usuarios/#" 
                        role="button">
                            <i className="pi pi-user"></i>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" 
                        href="/cadastro-lancamentos" 
                        role="button"><i className="pi pi-money-bill"></i>  Cadastrar Lançamento</a>
                </p>
          </div>
        )
    }
}
Home.contextType = AuthContext;

export default Home;