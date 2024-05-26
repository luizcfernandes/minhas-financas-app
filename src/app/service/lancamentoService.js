import ApiService from '../apiservice';
import ErroValidacao from '../exception/erroValidacao';

export default class LancamentoService extends ApiService {
    constructor(){
        super('/api/lancamentos');
    }

    obterListaMeses= 
        [
            {label: 'Selecione...', valor : ''},
            {label: 'Janeiro', valor : 1},
            {label: 'Fevereiro ', valor : 2},
            {label: 'Março', valor : 3},
            {label: 'Abril', valor : 4},
            {label: 'Maio', valor : 5},
            {label: 'Junho', valor : 6},
            {label: 'Julho', valor : 7},
            {label: 'Agosto', valor : 8},
            {label: 'Setembro', valor : 9},
            {label: 'Outubro', valor : 10},
            {label: 'Novembro', valor : 11},
            {label: 'Dezembro', valor : 12}
    ]

    obterListaTipos = [
            {label: 'Selecione...', valor : ''},
            {label: 'Despesa', valor : 'DESPESA'},
            {label: 'Receita', valor : 'RECEITA'}
    ]
    
    validar(lancamento) {
        const errs =  [];

        if(!lancamento.ano) {
            errs.push("Informe o Ano!");
        }
        if(!lancamento.mes) {
            errs.push("Informe o Mês!");
        }

        if(!lancamento.descricao) {
            errs.push("Informe a Descrição!");
        }

        if(!lancamento.valor) {
            errs.push("Informe o Valor!");
        }
        if(!lancamento.tipo) {
            errs.push("Informe o Tipo!");
        }


        if(errs && errs.length > 0){
            throw new ErroValidacao(errs);
        }
    }

    alterarStatus(id,status) {
        return this.put(`/${id}/atualiza-status`,{ status });
    }
    
    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`;
        }

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`;
        }
        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`;
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`;
        }
        return this.get(params);
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(lancamento) {
        return this.post('',lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`,lancamento);
    }

}