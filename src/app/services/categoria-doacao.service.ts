import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Urls } from '../core/constants/urls';
import { CategoriaDoacaoModel } from '../models/categoria-doacao.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaDoacaoService {

  protected urlCategoriasDoacao = Urls.categoriasDoacao;

  constructor(private http: HttpClient) { }

  consultarCategoriasDoacao(prefixo:string): Observable<CategoriaDoacaoModel[]>{
    return this.http.get(this.urlCategoriasDoacao + `?prefix=${prefixo}`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
