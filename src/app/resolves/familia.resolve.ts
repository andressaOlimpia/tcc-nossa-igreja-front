import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { FamiliaModel } from "../models/familia.model";
import { FamiliaService } from "../services/familia.service";

@Injectable()

export class FamiliaResolve implements Resolve<FamiliaModel> {

    constructor(private familiaService: FamiliaService) { }
    
    resolve(route: ActivatedRouteSnapshot){
        let familia = this.familiaService.consultarfamiliaPorId(route.params['id'])
        console.log(familia)
        return familia
    }

}