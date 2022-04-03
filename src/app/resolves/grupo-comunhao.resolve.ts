import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { GrupoComunhaoModel } from "../models/grupo-comunhao.model";
import { GruposComunhaoService } from "../services/grupos-comunhao.service";

@Injectable()

export class GrupoComunhaoResolve implements Resolve<GrupoComunhaoModel> {

    constructor(private gruposComunhaoService: GruposComunhaoService) { }
    
    resolve(route: ActivatedRouteSnapshot){
        return this.gruposComunhaoService.consultarGrupoComunhaoPorId(route.params['id'])
    }

}