import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Urls } from "../core/constants/urls";
import { ItemDoacaoModel } from "../models/item-doacao.model";

@Injectable({
    providedIn: 'root'
})
export class ItensDoacaoService {
    protected urlItensDoacao = Urls.itensDoacao

    constructor(private http: HttpClient) { }

    consultarItensDoacao(prefixo:string): Observable<ItemDoacaoModel[]>{
      return this.http.get(this.urlItensDoacao + `?prefixoNome=${prefixo}`)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error);
        })
      );
    }

    consultarItensDoacaoPorCategoria(categoriaId: number, prefixo:string): Observable<ItemDoacaoModel[]>{
      return this.http.get(this.urlItensDoacao + `?categoriaId=${categoriaId}&prefixoNome=${prefixo}`)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error);
        })
      );
    }

    cadastrarOuEditarItemDoacao(item: ItemDoacaoModel): Observable<ItemDoacaoModel>{
      const body = JSON.stringify(item);
      return this.http.post(this.urlItensDoacao, item)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error);
        })
      );
    }
  
    excluirItemDoacao(id: number){
      return this.http.delete(`${this.urlItensDoacao}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error);
        })
      )
    }
}