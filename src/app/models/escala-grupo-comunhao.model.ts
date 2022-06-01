import { GrupoComunhaoModel } from "./grupo-comunhao.model";
import { UsuarioModel } from "./usuario.model";

export interface EscalaGrupoComunhaoModel {
    id?: number;
    data: string;
    grupoComunhao?: GrupoComunhaoModel;
    dinamica?: UsuarioModel;
    louvor?: UsuarioModel;
    palavra?: UsuarioModel;
    lanche?: UsuarioModel;
}