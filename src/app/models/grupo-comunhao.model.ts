import { DiaSemanaEnum } from "./dia-semana.enum"
import { EnderecoModel } from "./endereco.model"
import { UsuarioModel } from "./usuario.model"

export interface GrupoComunhaoModel {
	id: number;
    nome?: string;
	diaSemana: DiaSemanaEnum;
	horario: string;
    lider: UsuarioModel;
	participantes?:UsuarioModel[];
	maxParticipantes: number;
	endereco:EnderecoModel;
}