import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ItemDoacaoModel } from "../models/item-doacao.model";
import { UsuarioModel } from "../models/usuario.model";
import { ItensDoacaoService } from "../services/itens-doacao.service";

@Injectable()

export class ItensDoacaoResolve implements Resolve<ItemDoacaoModel[]> {

    constructor(private itemDoacaoService: ItensDoacaoService) { }
    
    resolve(){
        let prefix = "";
        return this.itemDoacaoService.consultarItensDoacao(prefix)
    }
}