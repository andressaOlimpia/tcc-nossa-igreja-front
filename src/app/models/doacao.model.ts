import { FamiliaModel } from "./familia.model";
import { ItemDoacaoModel } from "./item-doacao.model";
import { UsuarioModel } from "./usuario.model";

export interface DoacaoModel{
    id?: number;
    item: ItemDoacaoModel;
    tamanho: string;
    quantidade: number;
    quantidadeReservada?: number;
    familia: FamiliaModel;
    detalhes?: string;
    doador?: UsuarioModel;
    dataReserva?: string;
    dataEntrega?: string;
    entregaRealizada?: boolean
}