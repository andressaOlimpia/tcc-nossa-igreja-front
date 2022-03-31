import { GrupoComunhaoModel } from "./grupo-comunhao.model";

export interface EnderecoModel{
    id: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    grupoComunhao?: GrupoComunhaoModel
}