
import React, { Component } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import  {withRouter}  from "../components/withRouter";

class CadastroUsuario extends Component {
    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    cadastrar = () => {
        console.log(this.state);
    }

    cancelar=()=>{
        this.props.router.navigate("/login");
    }
    render(){
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
                                    <button className="btn btn-success" onClick={this.cadastrar} >Salvar</button>
                                    <button className="btn btn-danger" onClick={this.cancelar}>Voltar</button>
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
export default withRouter(CadastroUsuario);