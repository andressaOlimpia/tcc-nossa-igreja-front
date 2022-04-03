import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Urls } from '../core/constants/urls';
import { CepConsultaModel } from '../models/cep-consulta.model';
import { GrupoComunhaoModel } from '../models/grupo-comunhao.model';

@Injectable({
  providedIn: 'root'
})
export class GruposComunhaoService {

  protected urlGrupoComunhao: string = Urls.grupoComunhao;

  constructor(private http: HttpClient) { }

  cadastrarGrupoComunhao(grupoComunhao: GrupoComunhaoModel): Observable<GrupoComunhaoModel>{
    const body = JSON.stringify(grupoComunhao);
    return this.http.post(this.urlGrupoComunhao, grupoComunhao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editarGrupoComunhao(grupoComunhao: GrupoComunhaoModel): Observable<GrupoComunhaoModel>{
    const body = JSON.stringify(grupoComunhao);
    return this.http.put(`${this.urlGrupoComunhao}/${grupoComunhao.id}`, grupoComunhao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  excluirGrupoComunhao(id: number){
    return this.http.delete(`${this.urlGrupoComunhao}/${id}`)
    .pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    )
  }

  consultarGruposComunhao(): Observable<GrupoComunhaoModel[]>{
    return this.http.get(this.urlGrupoComunhao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarGrupoComunhaoPorId(id: string): Observable<GrupoComunhaoModel>{
    return this.http.get(`${this.urlGrupoComunhao}/${id}`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  incluirParticipante(idGrupo: any, usuarioInscricao: any): Observable<GrupoComunhaoModel>{
    return this.http.patch(`${this.urlGrupoComunhao}/${idGrupo}`, usuarioInscricao)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarCepEndereco(cep: string): Observable<CepConsultaModel> {
    return this.http.get<CepConsultaModel>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error);
        })
      )
  }
}
