
import React, { Component } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import  {withRouter}  from "../components/withRouter";
import UsuarioService from "../app/service/usuarioService";
import {mensagemSucesso,mensagemErro} from '../components/toastr';
//import CoookiesService from "../app/service/cookiesService";
import { AuthContext } from "../main/provedorAutenticacao";

class CadastroUsuario extends Component {
    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    
    cadastrar = () => {
       
        const {nome,email,senha,senhaRepeticao} = this.state;
        const usuario = {nome, email, senha, senhaRepeticao}
        
        try {
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => {
                mensagemErro(msg);
            });
            return false;
        }
        this.service
                .salvar(usuario)
                .then(response => {
                    mensagemSucesso('Usuário cadastrado com sucesso!');
                    this.props.router.navigate('/login');
                })
                .catch( error =>{
                    mensagemErro(error.response.data);
                });        
    }

    cancelar=()=>{

        //CoookiesService.removerCookies('idUsuarioCookie');
        this.props.router.navigate("/login");
    }
    
    render(){
        console.log("-------Entrando Cadastro Usuario ----- Logado ? ---- ",this.context.isAutenticado);
        return (
            <div className="row">
                <div className="col-md-6" style={{position:'relative',left:'300px'}}>
                    <div className="bs-docs-section">
                    <Card title="Cadastro de Usuário">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <FormGroup label="Nome: *" htmlfor="InputNome">
                                        <input type="text" 
                                                    id="inputNome" 
                                                    name="nome" 
                                                    className="form-control"
                                                    onChange={e => this.setState({nome: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Email: *" htmlfor="InputEmail">
                                        <input type="email" 
                                                    id="inputEmail" 
                                                    name="email" 
                                                    className="form-control"
                                                    onChange={e => this.setState({email: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Senha: *" htmlfor="InputSenha1">
                                        <input type="password" 
                                                    id="inputSenha1" 
                                                    name="password" 
                                                    className="form-control"
                                                    onChange={e => this.setState({senha: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Repita a Senha: " htmlfor="InputSenha2">
                                        <input type="password" 
                                                    id="inputSenha2" 
                                                    name="password" 
                                                    className="form-control"
                                                    onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                    </FormGroup>
                                    <br />
                                    <button className="btn btn-success" 
                                            onClick={this.cadastrar} >
                                            <i className="pi pi-save"></i> Salvar</button>
                                    <button className="btn btn-danger" 
                                            onClick={this.cancelar}> 
                                            <i className="pi pi-times"></i> Cancelar</button>
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

CadastroUsuario.contextType = AuthContext;
export default withRouter(CadastroUsuario);