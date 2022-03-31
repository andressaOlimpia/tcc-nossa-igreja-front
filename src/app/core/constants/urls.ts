import { environment } from "src/environments/environment";

const nossaIgrejaAuth = environment.nossaIgrejaAuth;
const nossaIgrejaApi = environment.nossaIgrejaApi;

export const Urls = {
    nossaIgrejaAuth,
     
    usuario: nossaIgrejaApi + 'users',
    grupoComunhao: nossaIgrejaApi + 'grupos-comunhao'

}