import { DiaSemanaEnum } from "../modules/grupos-comunhao-adm/dia-semana.enum"
import { EnderecoModel } from "./endereco.model"
import { UsuarioModel } from "./usuario.model"

export interface GrupoComunhaoModel {
    nome?: string;
	diaSemana: DiaSemanaEnum;
	horario: string;
    lider: UsuarioModel;
	participantes?:UsuarioModel[];
	maxParticipantes: number;
	enderecos:EnderecoModel;

}