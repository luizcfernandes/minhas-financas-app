import Cookies from 'universal-cookie';

export default class CoookiesService {
   
        
    

   static gravarCookies = (sessao,valor,caminho='/')=>{
       /* let tempoExpirado = new Date();
        tempoExpirado.setTime(tempoExpirado.getTime() + (24*60*60*1000));
        */
       
        const cookies = new Cookies();
        //cookies.removerCookies(sessao);
        cookies.set(sessao,JSON.stringify(valor),{ path : caminho});
    }

    static obterCookies = (sessao) => {
        const cookies = new Cookies();
        return cookies.get(sessao);
        
    }

    static removerCookies(sessao){
        const cookies = new Cookies();
        cookies.remove(sessao);
    }
}