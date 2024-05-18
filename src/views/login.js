
import React, { Component } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class Login extends Component {
    state = {
        email : '',
        senha : ''
    }
    entrar = () => {
        console.log("Email: ", this.state.email);
        console.log("Senha: ", this.state.senha);
    }

    render(){
        return (
            <div className = "container">
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
                                                        placeholder="Digite o Email!" />
                                           </FormGroup>
                                           <FormGroup label="Senha: *" htmfor="exampleInputSenha1">
                                           <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e=>this.setState({senha:e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputSenha1"
                                                    aria-describedby="senhaHelp" 
                                                    placeholder="Digite a senha!" />     
                                           </FormGroup>
                                           <button className="btn btn-success" onClick={this.entrar} >Entrar</button>
                                           <button className="btn btn-danger">Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                               </div>
                            </Card>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;