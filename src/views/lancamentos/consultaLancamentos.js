import React, { Component } from "react";
import { withRouter } from "../../components/withRouter";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentosService from '../../app/service/lancamentoService';
import LocalStorageService from "../../app/service/localstorageService";
import { mensagemErro } from "../../components/toastr";
import * as messages from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaLancamentos extends Component {
    state = {
        descricao: '',
        ano : '',
        mes : '',
        tipo : '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos : []
    }
    constructor(){
        super();
        this.service = new LancamentosService();
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro('Campo Ano é obrigatório!');
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            descricao : this.state.descricao,
            ano : this.state.ano,
            mes : this.state.mes,
            tipo : this.state.tipo,
            usuario : usuarioLogado.id
        }
        console.log(lancamentoFiltro);
        this.service
            .consultar(lancamentoFiltro)
            .then(resposta =>{
                const lista = resposta.data;
                if(lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado!");
                }
                this.setState({
                    lancamentos : lista
                });
            })
            .catch( error=> {
                mensagemErro(error.data);
            });
    }

    editar = (id) => {
        this.props.router.navigate(`/cadastro-lancamentos/${id}`);
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog : true, lancamentoDeletar : lancamento});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog:false, lancamentoDeletar : {}});
    }
    deletar = () => {
        //console.log('delentando o lançamento',id);
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response=> {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index,1);
                this.setState(lancamentos);
                messages.mensagemSucesso('Deleção ocorrreu com sucesso!');
                this.setState({showConfirmDialog:false, lancamentoDeletar: {}})
            })
            .catch(error=> {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.');
            })
    }

    formularioCadastro=()=>{
        this.props.router.navigate('/cadastro-lancamentos');
    }

    alterarStatus =(lancamento,status)=>{
        this.service
            .alterarStatus(lancamento.id,status)
            .then(response=>{
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamentos});
                }
                messages.mensagemSucesso("Status atualizado com sucesso!");
            })
    }

    render(){
        const meses  = this.service.obterListaMeses;

        const tipos = this.service.obterListaTipos;

        const confirmDialogFooter = (
            <div>
                <Button label='Confirma'  
                        icon='pi pi-check' 
                        onClick={this.deletar} />
                <Button label='Cancelar' 
                        icon='pi pi-times' 
                        onClick={this.cancelarDelecao}
                        className="p-button-secondary" />
            </div>
        )
      
        return (
            <Card title="Consulta Lançamentos">
                <div className="row">    
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlfor="inputAno" label="Ano: *">
                                <input type="text"
                                        className="form-control"
                                        id="inputAno"
                                        value={this.state.ano}
                                        onChange={e=> this.setState({ano : e.target.value})}
                                        placeholder="Digite o ano!" />
                            </FormGroup>
                            <FormGroup htmlfor="inputMes" label="Mês: ">
                               <SelectMenu id="inputMes" 
                                            className="form-control" 
                                            onChange={e=> this.setState({mes : e.target.value})}
                                            listas={meses}/>
                            </FormGroup>
                            <FormGroup htmlfor="inputDescricao" label="Descricao: *">
                                <input type="text"
                                        className="form-control"
                                        id="inputDescricao"
                                        value={this.state.descricao}
                                        onChange={e=> this.setState({descricao : e.target.value})}
                                        placeholder="Digite a descrição!" />
                            </FormGroup>
                            <FormGroup htmlfor="inputTipo" label="Tipo Lançamento: ">
                               <SelectMenu id="inputTipo" 
                                            onChange={e=> this.setState({tipo : e.target.value})}
                                            className="form-control" 
                                            listas={tipos}/>
                            </FormGroup>
                            <br />
                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar</button>
                            <button type="button" 
                                    onClick={this.formularioCadastro}
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12"> 
                        <br />                           
                            <LancamentosTable 
                                    lancamentos={this.state.lancamentos}
                                    deleteAction={this.abrirConfirmacao}
                                    editAction={this.editar} 
                                    alterarStatus = {this.alterarStatus}/>

                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Apagando um lançamento." 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        modal={true}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                    <p className="m-0">
                        Confirma a exclusão deste lançamento?
                    </p>
                </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);