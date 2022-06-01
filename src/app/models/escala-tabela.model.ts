import { UsuarioModel } from "./usuario.model";

export interface EscalaTabelaModel {
    id?: number;
    data: string;
    dinamica?: UsuarioModel;
    louvor?: UsuarioModel;
    palavra?: UsuarioModel;
    lanche?: UsuarioModel;
}