import { EnderecoModel } from "./endereco.model";
import { UsuarioModel } from "./usuario.model";

export interface FamiliaModel{
    id?: number,
    principal: UsuarioModel,
    familiares: UsuarioModel[],
    familiaresSemCadastro: PessoaSemCadastro[],
    endereco: EnderecoModel

}

export interface PessoaSemCadastro{
    id?: number,
    nome: string,
    sobrenome: string,
    dataNascimento: string
}