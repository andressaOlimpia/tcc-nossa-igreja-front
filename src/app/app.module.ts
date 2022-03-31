import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    BrowserAnimationsModule,

    NavegacaoModule,
    LoginModule,
    MeusDadosModule,
    CadastroModule,
    GruposComunhaoAdmModule
  ],
  exports: [
    
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
