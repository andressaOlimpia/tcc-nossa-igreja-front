import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Urls } from '../core/constants/urls';
import { DoacaoModel } from '../models/doacao.model';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {

  protected urlDoacoes: string = Urls.doacoes;

  constructor(private http: HttpClient) { }

  cadastrarDoacao(doacao: DoacaoModel): Observable<DoacaoModel>{
    const body = JSON.stringify(doacao);
    return this.http.post(this.urlDoacoes, doacao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editarDoacao(doacao: DoacaoModel): Observable<DoacaoModel>{
    const body = JSON.stringify(doacao);
    return this.http.put(`${this.urlDoacoes}/${doacao.id}`, doacao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  excluirDoacao(id: number){
    return this.http.delete(`${this.urlDoacoes}/${id}`)
    .pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    )
  }

  consultarDoacoes(): Observable<DoacaoModel[]>{
    return this.http.get(this.urlDoacoes)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarDoacoesBasicInfo(): Observable<DoacaoModel[]>{
    return this.http.get(`${this.urlDoacoes}/basic`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarDoacaoPorId(id: string): Observable<DoacaoModel>{
    return this.http.get(`${this.urlDoacoes}/${id}`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  doar(doacao: DoacaoModel): Observable<DoacaoModel>{
    const body = JSON.stringify(doacao);
    return this.http.put(`${this.urlDoacoes}/doar`, doacao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  alterarRegistroEntrega(doacao: DoacaoModel): Observable<DoacaoModel>{
    const body = JSON.stringify(doacao);
    return this.http.patch(`${this.urlDoacoes}/${doacao.id}`, doacao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarCincoPrincipaisCategoriasDoacoes(): Observable<any[]>{
    return this.http.get(`${this.urlDoacoes}/estatisticas/principais-categorias`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarQuantidadesDoacoesMensais(): Observable<any[]>{
    return this.http.get(`${this.urlDoacoes}/estatisticas/doacoes-mensais`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
