import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Urls } from '../core/constants/urls';
import { CepConsultaModel } from '../models/cep-consulta.model';
import { FamiliaModel } from '../models/familia.model';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  
  protected urlFamilia: string = Urls.familia;

  constructor(private http: HttpClient) { }

  cadastrarFamilia(familia: FamiliaModel): Observable<FamiliaModel>{
    const body = JSON.stringify(familia);
    return this.http.post(this.urlFamilia, familia)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editarfamilia(familia: FamiliaModel): Observable<FamiliaModel>{
    const body = JSON.stringify(familia);
    return this.http.put(`${this.urlFamilia}/${familia.id}`, familia)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  excluirfamilia(id: number){
    return this.http.delete(`${this.urlFamilia}/${id}`)
    .pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    )
  }

  consultarFamilias(): Observable<FamiliaModel[]>{
    return this.http.get(this.urlFamilia)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  consultarfamiliaPorId(id: string): Observable<FamiliaModel>{
    return this.http.get(`${this.urlFamilia}/${id}`)
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
