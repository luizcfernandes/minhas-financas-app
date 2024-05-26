
import React, { Component } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {withRouter} from '../components/withRouter';
import UsuarioService from "../app/service/usuarioService";
//import  LocalStorageService  from "../app/service/localstorageService";
import {mensagemErro} from '../components/toastr';
//import CoookiesService from "../app/service/cookiesService";
import {AuthContext} from '../main/provedorAutenticacao';

class Login extends Component {
    
    constructor() {
        super();
        this.service = new UsuarioService();
    }

    state = {
        email : '',
        senha : '',
    }
  
    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        })
        .then(response=> {
           //LocalStorageService.adicionarItem('_usuario_logado',response.data);
           // CoookiesService.gravarCookies('idUsuarioCookie',response.data);
            this.context.iniciarSessao(response.data);
            this.props.router.navigate("/home");
        })
        .catch( erro=> {
            mensagemErro(erro.response.data);
        })
    }
    /* outra possibilidade
    entrar = async () => {
        try {
            await axios
                .post('http://localhost:8081/api/usuarios/autenticar', {
                    email: this.state.email,
                    senha: this.state.senha
                })
                .then(response=> {
                    this.props.router.navigate("/home");
                })
                .catch( erro=> {
                    this.setState({
                        mensagemErro : erro.response.data
                    })
                })
        }catch(error=>{
            this.setState({
                mensagemErro : error.reponse
            }) }) 
    }
    */
    prepareCadastrar = () => {
        this.props.router.navigate("/cadastro-usuarios");
    }
    render(){
        
        return (
            <div className="row">
                <div className="col-md-6" style={{position:'relative',left:'300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                          
                           <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                        <FormGroup label="Email: *" htmlfor="ExampleInputEmail1">
                                            <input type="email" 
                                                        value={this.state.email}
                                                        onChange={e=>this.setState({email:e.target.value})}
                                                        className="form-control" 
                                                        id="ExampleInputEmail1"
                                                        aria-describedby="emailHelp" 
                                                        placeholder="Digite o Email!" />                                           </FormGroup>
                                       <FormGroup label="Senha: *" htmfor="exampleInputSenha1">
                                            <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e=>this.setState({senha:e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputSenha1"
                                                    aria-describedby="senhaHelp" 
                                                    placeholder="Digite a senha!" />     
                                       </FormGroup>
                                        <button className="btn btn-success" 
                                                onClick={this.entrar} >
                                                <i className="pi pi-sign-in"></i> Entrar</button>
                                        <button className="btn btn-danger" 
                                                onClick={this.prepareCadastrar}>
                                                <i className="pi pi-plus"></i> Cadastrar</button>
                                        </fieldset>
                                    </div> 
                                </div>
                            </div>
                        </Card>
                    </div>  
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;
//const Login = withRouter(login);

export default withRouter(Login);