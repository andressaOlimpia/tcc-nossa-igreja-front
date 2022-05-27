import { environment } from "src/environments/environment";

const nossaIgrejaAuth = environment.nossaIgrejaAuth;
const nossaIgrejaApi = environment.nossaIgrejaApi;

export const Urls = {
    nossaIgrejaAuth,
     
    usuario: nossaIgrejaApi + 'users',
    grupoComunhao: nossaIgrejaApi + 'grupos-comunhao',
    itensDoacao: nossaIgrejaApi + 'itens-doacao',
    categoriasDoacao: nossaIgrejaApi + 'categorias-doacao',
    familia: nossaIgrejaApi + 'familia',
    doacoes: nossaIgrejaApi + 'doacoes'

}