import React, { Component } from "react";
import { withRouter } from "../../components/withRouter";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from '../../components/toastr';
import LocalStorageService from "../../app/service/localstorageService";
import CoookiesService from "../../app/service/cookiesService";
import { AuthContext } from "../../main/provedorAutenticacao";

class CadastroLancamentos extends Component {

    state = {
        id: null,
        descricao : '',
        valor :'',
        mes : '',
        ano : '',
        tipo : '',
        status : '',
        usuario : null,
        atualizando: false
    }

    constructor () {
        super();
        this.service = new LancamentoService();
    }
    componentDidMount(){
        const params = this.props.router.params;
        
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    console.log('atualizando...',true);
                    this.setState({...response.data, atualizando : true})
                })
                .catch(erros=> {
                    messages.mensagemErro(erros.response.data);
                })
        }
    }
    

    submit =()=> {
        
        const usuarioLogado =  LocalStorageService.obterItem('_usuario_logado') ? 
                        LocalStorageService.obterItem('_usuario_logado') : CoookiesService.obterCookies('idUsuarioCookie');
            
        const {descricao,valor,mes,ano,tipo} = this.state;
        const usuario = usuarioLogado.id;
        const lancamento = {descricao,valor,mes,ano,tipo,usuario}; 
                
        try {
            this.service.validar(lancamento);
        } catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => { messages.mensagemErro(msg)});
            return false;
        }
      
     
        this.service
                .salvar(lancamento)
                .then(response => {
                    this.props.router.navigate('/consulta-lancamentos');
                    messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
                })
                .catch(error=>{
                    messages.mensagemErro(error.response.data);
                });  //*/
    }

    atualizar=()=>{
       // eslint-disable-next-line 
        const usuarioLogado =  LocalStorageService.obterItem('_usuario_logado') ? 
        LocalStorageService.obterItem('_usuario_logado') : CoookiesService.obterCookies('idUsuarioCookie');

        const {descricao,valor,mes,ano,tipo,id,usuario,status} = this.state;
        const lancamento = {descricao,valor,mes,ano,tipo,id,usuario,status}; 
    
      //  console.log(lancamento);
       this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.router.navigate('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso!');
            })
            .catch(error=>{
                messages.mensagemErro(error.response.data);
            });  //*/
    }
    hanndleOnchange= (event) =>{
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name] : value,

        })
    }
    render() {
        const tipos = this.service.obterListaTipos;
        const meses = this.service.obterListaMeses;
        return (
            <Card title={ this.state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamentos"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input type="text" 
                                    id="inputDescricao"
                                    className="form-control"
                                    name="descricao"
                                    value = {this.state.descricao}
                                    onChange={this.hanndleOnchange} />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup id="inputAno" label="Ano: *">
                                <input id="inputAno" 
                                        type="text" 
                                        className="form-control"
                                        value = {this.state.ano}
                                        name="ano"
                                        onChange={this.hanndleOnchange} />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup id="inputMes" label="Mes: *">
                                <SelectMenu id="inputMes" 
                                            name="mes"
                                            listas={meses} 
                                            value={this.state.mes}
                                            onChange={this.hanndleOnchange}
                                            className="form-control" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                        type="text" 
                                        className="form-control"
                                        value = {this.state.valor}
                                        name="valor"
                                        onChange={this.hanndleOnchange} />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup id="inputTipo" label="Tipo: *">
                               <SelectMenu id="inputTipo" 
                                            listas={tipos} 
                                            value = {this.state.tipo}
                                            name="tipo"
                                            onChange={this.hanndleOnchange}
                                            className="form-control" />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup id="inputStatus" label="Status: ">
                               <input type="text" 
                                      value = {this.state.status}
                                      name ="status"
                                      className="form-control" 
                                      disabled />                                       
                            </FormGroup>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ? 
                            <button onClick={this.atualizar} 
                                    className="btn btn-success">
                                    <i className="pi pi-sync"></i> Atualizar</button> 
                        :
                            <button onClick={this.submit} 
                                    className="btn btn-success">
                                    <i className="pi pi-save"></i> Salvar</button>
                        }                         
                        <button onClick={e=>this.props.router.navigate('/consulta-lancamentos')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </Card>
        );
    }
}

CadastroLancamentos.contextType = AuthContext;
export default withRouter(CadastroLancamentos);