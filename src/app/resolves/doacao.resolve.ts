import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { DoacaoModel } from "../models/doacao.model";
import { DoacoesService } from "../services/doacoes.service";

@Injectable()

export class DoacaoResolve implements Resolve<DoacaoModel> {

    constructor(private doacaoService: DoacoesService) { }
    
    resolve(route: ActivatedRouteSnapshot){
        let doacao = this.doacaoService.consultarDoacaoPorId(route.params['id'])
        console.log(doacao)
        return doacao
    }

}