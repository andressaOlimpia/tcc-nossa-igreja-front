import { DiaSemanaEnum } from "./dia-semana.enum";
import { EscalaGrupoComunhaoModel } from "./escala-grupo-comunhao.model";
import { GrupoComunhaoModel } from "./grupo-comunhao.model";

export interface GrupoTabelaModel {
    //id: number;
    //nome?: string;
	//diaSemana: DiaSemanaEnum;
	//horario: string;
    grupo: GrupoComunhaoModel;
    escalas?: EscalaGrupoComunhaoModel[];
}