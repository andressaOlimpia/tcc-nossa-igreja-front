import { CategoriaDoacaoModel } from "./categoria-doacao.model";

export interface ItemDoacaoModel {
    id?: number,
    nome: string,
    categoria: CategoriaDoacaoModel
}