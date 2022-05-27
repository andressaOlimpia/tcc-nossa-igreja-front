import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { UsuarioModel } from "../models/usuario.model";
import { UsuarioService } from "../services/usuario.service";

@Injectable()

export class UsuarioResolve implements Resolve<UsuarioModel[]> {

    constructor(private usuarioService: UsuarioService) { }
    
    resolve(){
        let prefix = "";
        return this.usuarioService.listarUsuariosFiltradosPorPrefixo(prefix)
    }
}