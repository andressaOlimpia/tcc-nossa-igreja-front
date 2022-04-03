import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

// Intercepta chamadas http para incluir o token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Captura o token
        const token = localStorage.getItem("token");
        const cepConsuta = "https://viacep.com.br/ws"

        if (token) {
            if (this.authService.isTokenExpired()) {
                this.router.navigate(["login"]);
                return null;
            } else {
                // Caso o usuário esteja autenticado, inclui o token no cabeçalho da requisição http atual e a devolve.
                
                if(req.url.includes(cepConsuta)){
                    return next.handle(req);
                }

                let httpClone = req.clone({
                    headers: new HttpHeaders({
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    }),
                });
                return next.handle(httpClone);
            }
        } else {
            return next.handle(req);
        }
    }
}
