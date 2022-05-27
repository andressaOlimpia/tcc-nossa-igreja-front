import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { MeusDadosModule } from './modules/meus-dados/meus-dados.module';
import { AuthService } from './services/auth.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavegacaoModule } from './modules/navegacao/navegacao.module';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { GruposComunhaoAdmModule } from './modules/grupos-comunhao-adm/grupos-comunhao-adm.module';
import { AuthInterceptor } from './core/auth.interceptor';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ItensDoacaoModule } from './modules/itens-doacao/itens-doacao.module';
import { DoacoesModule } from './modules/doacoes/doacoes.module';
import { DoacoesAdmModule } from './modules/doacoes-adm/doacoes-adm.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    BrowserAnimationsModule,
    ChartModule,

    NavegacaoModule,
    LoginModule,
    MeusDadosModule,
    CadastroModule,
    GruposComunhaoAdmModule,
    UsuariosModule,
    ItensDoacaoModule,
    DoacoesModule,
    DoacoesAdmModule
  ],
  exports: [
    
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
