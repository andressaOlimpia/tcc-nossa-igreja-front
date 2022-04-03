import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError} from 'rxjs';
import { Urls } from '../core/constants/urls';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  protected urlUsuario: string = Urls.usuario;

  constructor(private http:HttpClient) { }

  cadastrarUsuario(usuario:UsuarioModel): Observable<UsuarioModel>{
    const body = JSON.stringify(usuario);
    return this.http.post(`${this.urlUsuario}/cadastrar`, usuario)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editarUsuario(usuario:UsuarioModel): Observable<UsuarioModel>{
    const body = JSON.stringify(usuario);
    return this.http.put(`${this.urlUsuario}/${usuario.id}`, usuario)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  listarUsuariosFiltradosPorPrefixo(prefixo: any): Observable<UsuarioModel[]>{
    //let queryParams: HttpParams = new HttpParams();
    //queryParams.append('prefix', prefixo)
    //return this.http.get(this.urlUsuario, {params: queryParams})

    return this.http.get(this.urlUsuario + `?prefix=${prefixo}`)
    .pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  listarUsuarioPorId(id: any): Observable<UsuarioModel>{

    return this.http.get(`${this.urlUsuario}/${id}`)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
}
