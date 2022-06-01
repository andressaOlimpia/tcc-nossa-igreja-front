import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Urls } from "../core/constants/urls";
import { EscalaGrupoComunhaoModel } from "../models/escala-grupo-comunhao.model";

@Injectable({
    providedIn: 'root'
  })
  export class EscalaGrupoComunhaoService {

    protected urlEscalaGrupoComunhao: string = Urls.escalaGrupoComunhao;

    constructor(private http: HttpClient) { }

    cadastrarOuEditarEscalaGrupoComunhao(escalaGrupoComunhao: EscalaGrupoComunhaoModel): Observable<EscalaGrupoComunhaoModel>{
        const body = JSON.stringify(escalaGrupoComunhao);
        return this.http.post(this.urlEscalaGrupoComunhao, escalaGrupoComunhao)
        .pipe(
          map((response: any) => response),
          catchError((error: any) => {
            console.error(error);
            return throwError(() => error);
          })
        );
    }
    
    excluirEscalaGrupoComunhao(id: number){
        return this.http.delete(`${this.urlEscalaGrupoComunhao}/${id}`)
        .pipe(
            catchError((error: any) => {
            console.error(error);
            return throwError(() => error);
            })
        )
    }
    
    consultarEscalaGruposComunhao(id: number): Observable<EscalaGrupoComunhaoModel[]>{
        return this.http.get(`${this.urlEscalaGrupoComunhao}/grupo/${id}`)
        .pipe(
            map((response: any) => response),
            catchError((error: any) => {
            console.error(error);
            return throwError(() => error);
            })
        );
    }
}