import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { TokenDecodificadoModel } from '../models/token-decodificado.model';
import { TokenModel } from '../models/token.model';
import { Urls } from '../core/constants/urls';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
        AuthService.logger = new BehaviorSubject(this.estaAutenticado());
    }

    public static PRIMEIRO_NOME = '';
    public static logger: BehaviorSubject<boolean>;
    private jwtHelper = new JwtHelperService();
    private tokenDecodificado?: TokenDecodificadoModel;
    tipoUsuarioConectado?: string;

    login(username: string, password: string): any {
        const apiLogin = Urls.nossaIgrejaAuth;

        const auth = btoa('client-password:secret');

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + auth
            })
        };

        const data = 'username=' + username + '&password=' + encodeURIComponent(password) + '&grant_type=password';

        // Remove o token que porventura esteja gravado no localStorage.
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('nomeUsuario');
            localStorage.removeItem('sobrenomeUsuario');
            localStorage.removeItem('idUsuario');

        }

        return this.http.post<TokenModel>(apiLogin, data, options).pipe(tap(
            // Grava o token recebido do back-end no localstorage
            (response: TokenModel) => {
                localStorage.setItem('token', response.access_token);
                this.tokenDecodificado = this.jwtHelper.decodeToken(response.access_token);
                localStorage.setItem('username', this.tokenDecodificado.username);
                localStorage.setItem('nomeUsuario', this.tokenDecodificado.nome);
                localStorage.setItem('sobrenomeUsuario', this.tokenDecodificado.sobrenome);
                localStorage.setItem('idUsuario', this.tokenDecodificado.id.toString());

                AuthService.logger.next(true);
            },
            error => {
                throwError(() => error);
            }
        ));
    }

    isTokenExpired(): boolean {
        return this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('username');
        localStorage.removeItem('nomeUsuario');
        localStorage.removeItem('sobrenomeUsuario');
        AuthService.logger.next(false);
    }

    estaAutenticado(): boolean {
        const token = localStorage.getItem('token');
        if (token !== '' && token !== null && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            return false;
        }
    }

      

    getPermissaoUsuarioLogado(): string {
        if (localStorage.getItem('token')) {
            this.decodificaToken();
            if (this.tokenDecodificado.authorities[0]) {
                return this.tokenDecodificado.authorities[0];
            }
        }
        return null;
    }

    decodificaToken(): any {
        const token = localStorage.getItem('token');
        this.tokenDecodificado = this.jwtHelper.decodeToken(token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    getUserNameUsuarioLogado(): string {
        return localStorage.getItem('username');
    }

    getIdUsuarioLogado(): string {
        return localStorage.getItem('idUsuario');
    }

    getNomeUsuarioLogado(): string {
        return localStorage.getItem('nomeUsuario');
    }

    geSobrenomeUsuarioLogado(): string {
        return localStorage.getItem('sobrenomeUsuario');
    }
    
    isAuthorized(allowedRoles: string[]): boolean {
        // check if the list of allowed roles is empty, if empty, authorize the user to access the page
        if (allowedRoles == null || allowedRoles.length === 0) {
          return true;
        }
      
        // get token from local storage or state management
       const token = localStorage.getItem('token');
      
          // decode token to read the payload details
        const decodeToken = this.jwtHelper.decodeToken(token);
      
      // check if it was decoded successfully, if not the token is not valid, deny access
        if (!decodeToken) {
          console.log('Invalid token');
          return false;
        }
      
      // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
        return allowedRoles.includes(this.getPermissaoUsuarioLogado());
      }
}
