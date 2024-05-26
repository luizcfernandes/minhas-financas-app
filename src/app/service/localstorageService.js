export default class LocalStorageService {

    static adicionarItem(chave,valor) {
        try {
            localStorage.setItem(chave,JSON.stringify(valor));
        }catch{};
    }

    static obterItem(chave){
        try {
            return JSON.parse(localStorage.getItem(chave));
        }catch{ }
    }

    static deletarItem(chave){
        try {
            localStorage.deleteItem(chave);
        }catch{}
    }

    static removerItem(chave) {
        localStorage.removeItem(chave);
    }
}
